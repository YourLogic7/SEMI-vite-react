import mongoose from 'mongoose';
import Product from '../models/product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    console.log('--- [DEBUG] Entering createProduct ---');
    try {
        console.log('[DEBUG] Raw req.body:', JSON.stringify(req.body, null, 2));
        console.log('[DEBUG] req.files exists:', !!req.files);
        if(req.files) {
            console.log('[DEBUG] req.files details:', req.files.map(f => f.originalname));
        }

        const variants = req.body.variants ? JSON.parse(req.body.variants).map(v => ({ ...v, stock: parseInt(v.stock, 10) || 0, price: parseFloat(v.price) || 0 })) : [];
        const shipping = req.body.shipping ? JSON.parse(req.body.shipping) : [];
        
        console.log('[DEBUG] Parsed variants count:', variants.length);

        const totalStock = variants.reduce((acc, variant) => acc + (parseInt(variant.stock, 10) || 0), 0);
        const mainPrice = variants.length > 0 ? parseFloat(variants[0].price) : 0;
        console.log(`[DEBUG] Calculated totalStock: ${totalStock}, mainPrice: ${mainPrice}`);

        const productDataForDb = {
            name: req.body.name,
            price: mainPrice,
            stock: totalStock,
            sellerId: mongoose.Types.ObjectId(req.body.sellerId),
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            weight: req.body.weight ? parseFloat(req.body.weight) : 0,
            variants: variants,
            minPurchase: req.body.minPurchase ? parseInt(req.body.minPurchase, 10) : 1,
            preorder: req.body.preorder,
            insurance: req.body.insurance,
            condition: req.body.condition,
            sku: req.body.sku,
            shipping: shipping,
            video: req.body.video,
        };

        if (req.files && req.files.length > 0) {
            productDataForDb.images = req.files.map(file => `/${file.path.replace(/\\/g, '/')}`);
        }
        console.log('[DEBUG] Mapped image paths:', productDataForDb.images);

        if (req.body.expired) {
            productDataForDb.expired = req.body.expired;
        }

        console.log('[DEBUG] Final object for database:', JSON.stringify(productDataForDb, null, 2));

        const product = new Product(productDataForDb);

        let createdProduct;
        try {
            console.log('[DEBUG] Attempting to save product to database...');
            createdProduct = await product.save();
            console.log('[DEBUG] Product saved successfully!');
        } catch (dbError) {
            console.error('--- [DATABASE ERROR] --- ', dbError);
            return res.status(500).json({ message: 'Database save failed', error: dbError.message });
        }

        res.status(201).json(createdProduct);

    } catch (error) {
        console.error('--- [GENERAL ERROR] --- ', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = req.body.name ?? product.name;
            product.description = req.body.description ?? product.description;
            product.brand = req.body.brand ?? product.brand;
            product.category = req.body.category ?? product.category;
            product.preorder = req.body.preorder ?? product.preorder;
            product.insurance = req.body.insurance ?? product.insurance;
            product.condition = req.body.condition ?? product.condition;
            product.sku = req.body.sku ?? product.sku;
            product.video = req.body.video ?? product.video;

            if (req.body.weight !== undefined) product.weight = req.body.weight ? parseFloat(req.body.weight) : 0;
            if (req.body.minPurchase !== undefined) product.minPurchase = req.body.minPurchase ? parseInt(req.body.minPurchase, 10) : 1;

            if (req.body.variants) {
                const variants = JSON.parse(req.body.variants).map(v => ({ ...v, stock: parseInt(v.stock, 10) || 0, price: parseFloat(v.price) || 0 }));
                product.variants = variants;
                product.stock = variants.reduce((acc, variant) => acc + (parseInt(variant.stock, 10) || 0), 0);
                product.price = variants.length > 0 ? parseFloat(variants[0].price) : 0;
            }
            if (req.body.shipping) product.shipping = JSON.parse(req.body.shipping);
            
            if (req.files && req.files.length > 0) {
                const newImages = req.files.map(file => `/${file.path.replace(/\\/g, '/')}`);
                product.images = product.images.concat(newImages);
            } else if (req.body.images) {
                 product.images = JSON.parse(req.body.images);
            }

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.remove();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};

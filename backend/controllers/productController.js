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
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            sellerId: req.body.sellerId,
            imageUrl: req.file ? `/${req.file.path.replace(/\\/g, '/')}` : '',
            images: req.body.images,
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            stock: req.body.stock,
            expired: req.body.expired,
            weight: req.body.weight,
            volume: req.body.volume,
            variants: req.body.variants,
            hpp: req.body.hpp,
            minPurchase: req.body.minPurchase,
            preorder: req.body.preorder,
            insurance: req.body.insurance,
            condition: req.body.condition,
            sku: req.body.sku,
            shipping: req.body.shipping,
            video: req.body.video,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
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
            product.price = req.body.price ?? product.price;
            product.description = req.body.description ?? product.description;
            product.images = req.body.images ?? product.images;
            product.brand = req.body.brand ?? product.brand;
            product.category = req.body.category ?? product.category;
            product.stock = req.body.stock ?? product.stock;
            product.expired = req.body.expired ?? product.expired;
            product.weight = req.body.weight ?? product.weight;
            product.volume = req.body.volume ?? product.volume;
            product.variants = req.body.variants ?? product.variants;
            product.hpp = req.body.hpp ?? product.hpp;
            product.minPurchase = req.body.minPurchase ?? product.minPurchase;
            product.preorder = req.body.preorder ?? product.preorder;
            product.insurance = req.body.insurance ?? product.insurance;
            product.condition = req.body.condition ?? product.condition;
            product.sku = req.body.sku ?? product.sku;
            product.shipping = req.body.shipping ?? product.shipping;
            product.video = req.body.video ?? product.video;

            if (req.file) {
                product.imageUrl = `/${req.file.path.replace(/\\/g, '/')}`;
            } else if (req.body.imageUrl) {
                product.imageUrl = req.body.imageUrl;
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

// @desc    Upload a product image
// @route   POST /api/products/upload-image
// @access  Private/Admin
const uploadProductImage = (req, res) => {
    if (req.file) {
        res.status(200).json({
            message: 'Image uploaded successfully',
            imageUrl: `/${req.file.path.replace(/\\/g, '/')}`,
        });
    } else {
        res.status(400).json({ message: 'No image file provided' });
    }
};

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
};

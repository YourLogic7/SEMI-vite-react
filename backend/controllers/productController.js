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
        const variants = req.body.variants ? JSON.parse(req.body.variants) : [];
        const shipping = req.body.shipping ? JSON.parse(req.body.shipping) : [];
        
        const totalStock = variants.reduce((acc, variant) => acc + (parseInt(variant.stock, 10) || 0), 0);
        const mainPrice = variants.length > 0 ? parseFloat(variants[0].price) : 0;

        const images = req.files ? req.files.map(file => `/${file.path.replace(/\\/g, '/')}`) : [];

        const productDataForDb = {
            name: req.body.name,
            price: mainPrice,
            stock: totalStock,
            sellerId: req.body.sellerId,
            images: images,
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            weight: parseFloat(req.body.weight),
            variants: variants,
            minPurchase: parseInt(req.body.minPurchase, 10),
            preorder: req.body.preorder,
            insurance: req.body.insurance,
            condition: req.body.condition,
            sku: req.body.sku,
            shipping: shipping,
            video: req.body.video,
        };

        if (req.body.expired) {
            productDataForDb.expired = req.body.expired;
        }

        const product = new Product(productDataForDb);
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
            product.description = req.body.description ?? product.description;
            product.brand = req.body.brand ?? product.brand;
            product.category = req.body.category ?? product.category;
            product.preorder = req.body.preorder ?? product.preorder;
            product.insurance = req.body.insurance ?? product.insurance;
            product.condition = req.body.condition ?? product.condition;
            product.sku = req.body.sku ?? product.sku;
            product.video = req.body.video ?? product.video;

            if (req.body.weight !== undefined) product.weight = parseFloat(req.body.weight);
            if (req.body.minPurchase !== undefined) product.minPurchase = parseInt(req.body.minPurchase, 10);

            if (req.body.variants) {
                const variants = JSON.parse(req.body.variants);
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

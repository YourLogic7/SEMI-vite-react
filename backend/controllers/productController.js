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
        console.log('[DEBUG] req.file exists:', !!req.file);
        if(req.file) {
            console.log('[DEBUG] req.file details:', req.file.originalname, req.file.path);
        }

        // Parse stringified fields from FormData
        console.log('[DEBUG] Parsing variants and shipping...');
        const variants = req.body.variants ? JSON.parse(req.body.variants) : [];
        const shipping = req.body.shipping ? JSON.parse(req.body.shipping) : [];
        const images = req.body.images ? JSON.parse(req.body.images) : [];
        console.log('[DEBUG] Parsed variants count:', variants.length);

        // New logic: Calculate stock and price from variants
        console.log('[DEBUG] Calculating totalStock and mainPrice...');
        const totalStock = variants.reduce((acc, variant) => acc + (parseInt(variant.stock, 10) || 0), 0);
        const mainPrice = variants.length > 0 ? parseFloat(variants[0].price) : 0;
        console.log(`[DEBUG] Calculated totalStock: ${totalStock}, mainPrice: ${mainPrice}`);

        const productDataForDb = {
            name: req.body.name,
            price: mainPrice,
            stock: totalStock,
            sellerId: req.body.sellerId,
            imageUrl: req.file ? `/${req.file.path.replace(/\\/g, '/')}` : '',
            images: images,
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            expired: req.body.expired,
            weight: parseFloat(req.body.weight),
            volume: req.body.volume,
            variants: variants,
            minPurchase: parseInt(req.body.minPurchase, 10),
            preorder: req.body.preorder,
            insurance: req.body.insurance,
            condition: req.body.condition,
            sku: req.body.sku,
            shipping: shipping,
            video: req.body.video,
        };

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
            // Update non-numeric, non-JSON fields
            product.name = req.body.name ?? product.name;
            product.description = req.body.description ?? product.description;
            product.brand = req.body.brand ?? product.brand;
            product.category = req.body.category ?? product.category;
            product.expired = req.body.expired ?? product.expired;
            product.volume = req.body.volume ?? product.volume;
            product.preorder = req.body.preorder ?? product.preorder;
            product.insurance = req.body.insurance ?? product.insurance;
            product.condition = req.body.condition ?? product.condition;
            product.sku = req.body.sku ?? product.sku;
            product.video = req.body.video ?? product.video;

            // Convert numeric fields that are not calculated from variants
            if (req.body.weight !== undefined) product.weight = parseFloat(req.body.weight);
            if (req.body.minPurchase !== undefined) product.minPurchase = parseInt(req.body.minPurchase, 10);

            // Handle stringified JSON fields
            if (req.body.variants) {
                const variants = JSON.parse(req.body.variants);
                product.variants = variants;
                // Recalculate stock and price based on new variants
                product.stock = variants.reduce((acc, variant) => acc + (parseInt(variant.stock, 10) || 0), 0);
                product.price = variants.length > 0 ? parseFloat(variants[0].price) : 0;
            }
            if (req.body.shipping) product.shipping = JSON.parse(req.body.shipping);
            if (req.body.images) product.images = JSON.parse(req.body.images);

            // Handle image file upload
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

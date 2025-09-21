import express from 'express';
import Product from '../models/product.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Images will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// @route   POST api/products/upload-image
// @desc    Upload a product image
// @access  Private (should be seller only)
router.post('/upload-image', upload.single('productImage'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Tidak ada file yang diunggah.' });
    }
    // Return the URL of the uploaded image
    res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
  } catch (error) {
    console.error('Error uploading image:', error.message);
    res.status(500).json({ message: 'Gagal mengunggah gambar.', error: error.message });
  }
});

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, isFlashSale } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' }; // 'i' for case-insensitive
    }

    if (isFlashSale === 'true') {
      filter.isFlashSale = true;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/products
// @desc    Create a new product
// @access  Private (should be seller only)
router.post('/', async (req, res) => {
  try {
    const { name, price, stock, imageUrl, description, category, sellerId, isFlashSale, discountPrice, totalStock } = req.body;

    const newProduct = new Product({
      name,
      price,
      stock,
      imageUrl,
      description,
      category,
      sellerId,
      isFlashSale,
      discountPrice,
      totalStock,
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private (should be seller only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, imageUrl, description, category, isFlashSale, discountPrice, totalStock } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan.' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.imageUrl = imageUrl || product.imageUrl;
    product.description = description || product.description;
    product.category = category || product.category;
    product.isFlashSale = isFlashSale !== undefined ? isFlashSale : product.isFlashSale;
    product.discountPrice = discountPrice || product.discountPrice;
    product.totalStock = totalStock || product.totalStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private (should be seller only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan.' });
    }

    await product.deleteOne(); // Use deleteOne() instead of remove()
    res.json({ message: 'Produk berhasil dihapus.' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;

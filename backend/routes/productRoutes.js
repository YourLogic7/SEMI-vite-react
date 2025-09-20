import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

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

export default router;

import express from 'express';
import Seller from '../models/seller.js';

const router = express.Router();

// @route   GET api/sellers
// @desc    Get all sellers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;

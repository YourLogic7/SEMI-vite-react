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

// @route   POST api/sellers/register-store
// @desc    Register a new store for a user
// @access  Private (should be authenticated)
router.post('/register-store', async (req, res) => {
  try {
    const { userId, storeName, province, city, district, bannerUrl } = req.body;

    // Check if a store already exists for this user
    const existingSeller = await Seller.findOne({ userId });
    if (existingSeller) {
      return res.status(400).json({ message: 'Anda sudah memiliki toko.' });
    }

    const newSeller = new Seller({ userId, storeName, province, city, district, bannerUrl });
    await newSeller.save();

    res.status(201).json({ message: 'Pendaftaran toko berhasil!', seller: newSeller });
  } catch (error) {
    console.error('Error registering store:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;

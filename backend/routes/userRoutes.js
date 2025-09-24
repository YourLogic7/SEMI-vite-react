import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

// Fungsi untuk menghasilkan token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @route   GET api/users
// @desc    Get all users
// @access  Public (atau bisa diubah menjadi Private/Admin)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, noHandphone } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email sudah terdaftar.' });
    }

    const newUser = new User({ name, email, password, noHandphone, displayName: name });
    await newUser.save();
    
    const userResponse = newUser.toObject();
    delete userResponse.password;

    const token = generateToken(newUser._id);

    res.status(201).json({ 
      message: 'Pendaftaran berhasil!', 
      user: userResponse,
      token: token 
    });
  } catch (error) {
    console.error('Error in /register endpoint:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt for email:', email);
    console.log('Password received:', password ? '[PASSWORD_RECEIVED]' : '[NO_PASSWORD]'); // Jangan log password mentah

    const user = await User.findOne({ email });
    console.log('User found:', user ? user.email : 'None');
    console.log('User password hash from DB:', user && user.password ? '[HASH_FOUND]' : '[NO_HASH]');

    if (!user || !user.password) {
      console.log('Login failed: User not found or no password in DB.');
      return res.status(400).json({ message: 'Email atau kata sandi salah.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result (bcrypt.compare):', isMatch);

    if (!isMatch) {
      console.log('Login failed: Password mismatch.');
      return res.status(400).json({ message: 'Email atau kata sandi salah.' });
    }

    const userResponse = user.toObject();
    delete userResponse.password;
    
    const token = generateToken(user._id);

    console.log('Login successful for user:', user.email);
    res.status(200).json({ 
      message: 'Login berhasil!', 
      user: userResponse,
      token: token
    });

  } catch (error) {
    console.error('Login error (catch block):', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   PUT api/users/:id/roles
// @desc    Update a user's roles
// @access  Private (should be admin or self-update)
router.put('/:id/roles', async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    user.role = roles; // Update the roles array
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ message: 'Peran pengguna berhasil diperbarui.', user: userResponse });
  } catch (error) {
    console.error('Error updating user roles:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
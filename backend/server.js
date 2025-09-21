import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import midtransRoutes from './routes/midtransRoutes.js';
import Product from './models/product.js';
import Seller from './models/seller.js';
import Order from './models/order.js';
import User from './models/user.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Gunakan rute
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/midtrans', midtransRoutes);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Koneksi ke MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
    });
    console.log('Koneksi ke MongoDB berhasil!');
    // await seedDatabase(); // Seeding dinonaktifkan
  } catch (err) {
    console.error('Gagal terhubung ke MongoDB:', err);
    process.exit(1); // Keluar dari aplikasi jika koneksi gagal
  }
};

// Fungsi seeding tetap ada jika diperlukan untuk dijalankan secara manual
const seedDatabase = async () => {
  try {
    // Data seeding bisa dipindahkan ke file/skrip terpisah nanti
    // Untuk saat ini, kita akan menonaktifkannya agar tidak berjalan otomatis
    console.log('Fungsi seeding saat ini dinonaktifkan.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

export default app;
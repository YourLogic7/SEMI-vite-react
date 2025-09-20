import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  noHandphone: {
    type: String,
  },
  role: {
    type: String,
    default: 'customer',
  },
  displayName: {
    type: String,
  },
}, {
  timestamps: true,
});

// Middleware untuk mengenkripsi kata sandi sebelum disimpan
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
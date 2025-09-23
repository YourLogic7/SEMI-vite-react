import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number },
  stock: { type: Number, default: 0 },

  images: { type: [String], default: [] },
  sold: { type: Number, default: 0 },
  description: { type: String, required: true },
  category: { type: String, required: true },
  reviews: [reviewSchema],
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
  isFlashSale: { type: Boolean, default: false },
  discountPrice: { type: Number },
  totalStock: { type: Number },
  brand: { type: String },

  weight: { type: Number },
  volume: { type: String },
  variants: { type: [{ name: String, stock: Number, price: Number }], default: [] },

  minPurchase: { type: Number, default: 1 },
  preorder: { type: String, default: 'Tidak' },
  insurance: { type: String, default: 'Tidak' },
  condition: { type: String, default: 'Baru' },
  sku: { type: String },
  shipping: { type: [String], default: [] },
  video: { type: String },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;

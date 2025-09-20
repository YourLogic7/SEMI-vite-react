import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  imageUrl: { type: String, required: true },
  sold: { type: Number, default: 0 },
  description: { type: String, required: true },
  category: { type: String, required: true },
  reviews: [reviewSchema],
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }, // This will be a reference to a Seller model
  isFlashSale: { type: Boolean, default: false },
  discountPrice: { type: Number },
  totalStock: { type: Number },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;

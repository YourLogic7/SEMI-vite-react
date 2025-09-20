import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  bannerUrl: { type: String, required: true },
}, { timestamps: true });

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;

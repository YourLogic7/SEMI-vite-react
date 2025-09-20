import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  sellerId: { type: Number, required: true },
  customer: { type: String, required: true },
  date: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String, required: true },
  items: [orderItemSchema],
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;

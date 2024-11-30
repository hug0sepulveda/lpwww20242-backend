import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },
  orderDetails: { type: String },
  address: {
    comuna: { type: String, required: true },
    calle: { type: String, required: true },
    numero: { type: Number, required: true }
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
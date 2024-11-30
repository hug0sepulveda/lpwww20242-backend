import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true },
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
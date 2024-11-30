import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categories: { 
    type: [String], 
    required: true, 
    enum: [
      'Promociones', 'Hand Rolls', 'Hosomaki y Gyosas', 
      'Sashimi', 'Niguiri', 'Chirasi', 'Yakimeshi', 
      'Yakisoba', 'Extras', 'Para compartir', 'Líquidos'
    ]
  },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
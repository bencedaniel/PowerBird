import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const basicCheckTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true // Pl. "Napi rutin", "Féléves hardver teszt"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('BasicCheckType', basicCheckTypeSchema);
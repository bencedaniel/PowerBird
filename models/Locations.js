import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const locationSchema = new Schema({
  building: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    unique: true, // Ne lehessen kétszer felvinni ugyanazt a raktárat/irodát
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: '' // Bővebb leírás, pl. "Az A épület alagsori szerverszobája"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Location', locationSchema);
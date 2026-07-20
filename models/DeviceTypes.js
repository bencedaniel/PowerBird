import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const deviceTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Pl. "Laptop", "Vonalkódolvasó", "Targonca terminál"
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true // Soft-delete funkció itt is
  }
}, {
  timestamps: true
});

export default mongoose.model('DeviceType', deviceTypeSchema);
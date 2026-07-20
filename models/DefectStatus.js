import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const defectStatusSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true // Pl. "Nyitott", "Folyamatban", "Alkatrészre vár", "Lezárva"
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true // Pl. "OPEN", "IN_PROGRESS", "WAITING_PARTS", "RESOLVED"
  },
  isTerminal: {
    type: Boolean,
    default: false // Ha true (pl. RESOLVED), a hibajegy lezártnak tekintendő
  },
  orderIndex: {
    type: Number,
    default: 0 // Segít a frontendnek sorba rendezni a státuszokat a lenyíló listában (0, 10, 20...)
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('DefectStatus', defectStatusSchema);
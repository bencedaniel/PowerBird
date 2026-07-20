const mongoose = require('mongoose');
const { Schema } = mongoose;

const defectTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true // Pl. "Akkumulátor degradáció", "Fizikai törés", "Szoftverhiba"
  },
  severity: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'MEDIUM' // Alapértelmezett prioritás ehhez a hibatípushoz
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DefectType', defectTypeSchema);
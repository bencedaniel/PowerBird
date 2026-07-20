import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const apiKeySchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true // Kötelező az indexelés, mert minden API hívásnál ez alapján keresünk
  },
  description: {
    type: String,
    required: true,
    trim: true // Pl. "Windows kliensek éles telemetria kulcsa 2026"
  },
  lastUsedAt: {
    type: Date,
    default: null // Minden sikeres hitelesítésnél érdemes frissíteni
  },
  isActive: {
    type: Boolean,
    default: true // Ha kiszivárog egy kulcs, itt azonnal letiltható false-ra állítással
  }
}, {
  timestamps: true
});

export default mongoose.model('ApiKey', apiKeySchema);
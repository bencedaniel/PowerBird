import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const batteryCheckSchema = new Schema({
  deviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true,
    index: true // Indexeljük, hogy nagyon gyorsan le tudjuk kérdezni egy adott gép akku-történetét
  },
  source: {
    type: String,
    enum: ['API', 'OPERATOR'],
    required: true
  },
  operatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null // Ha az API-ról jön az adat, ez a mező üres marad
  },
  coreData: {
    chargePct: {
      type: Number
      required: true
    }
  },
  rawApiPayload: {
    type: Schema.Types.Mixed, // Bármilyen strukturálatlan JSON objektumot befogad
    default: null
  }
}, {
  timestamps: true // Automatikusan rögzíti a createdAt (mérés ideje) és updatedAt mezőket
});

export default mongoose.model('BatteryCheck', batteryCheckSchema);
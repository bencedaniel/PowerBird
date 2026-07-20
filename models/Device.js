import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const deviceSchema = new Schema({
  readableId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true // Az API kérések (pl. kliens bejelentkezés) gyors kereséséhez
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  serialNumber: {
    type: String,
    unique: true,
    trim: true
  },
  typeId: {
    type: Schema.Types.ObjectId,
    ref: 'DeviceType',
    required: true
  },
  locationId: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  batteryIndicatorType: {
    type: String,
    enum: ['Percentage', '3Led', '5Led']
  },
  lastKnownBatteryState: {
    chargePct: {
      type: Number,
      default: null
    },

    updatedAt: {
      type: Date,
      default: null
    }
  },
  lastKnownPeriodicalCheck: {
    checkTypeId: {
      type: Schema.Types.ObjectId,
      ref: 'BasicCheckType',
      default: null
    },
    updatedAt: {
      type: Date,
      default: null
    }
  },
  PeriodicalCheckIntervalDays: {
    type: Number,
    default: 30 // Alapértelmezett periodikus ellenőrzési intervallum 30 nap
  },
  BatteryCheckIntervalDays: {
    type: Number,
    default: 7 // Alapértelmezett akkumulátor ellenőrzési intervallum 7 nap
  },
  isActive: {
    type: Boolean,
    default: true // Soft-delete funkció
  }
}, {
  timestamps: true // Automatikusan generálja és frissíti a createdAt és updatedAt mezőket
});

export default mongoose.model('Device', deviceSchema);
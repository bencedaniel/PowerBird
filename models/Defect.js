import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// 1. A beágyazott történet (History) alsémája
const defectHistorySchema = new Schema({
  statusId: {
    type: Schema.Types.ObjectId,
    ref: 'DefectStatus', // A státusztörzsadat (pl. OPEN, IN_PROGRESS, RESOLVED)
    required: true
  },
  comment: {
    type: String,
    trim: true,
    default: ''
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true // Ide kerülhet az operátor ID-ja, automata hiba esetén pedig egy dedikált "System User" ID-ja
  },
  updatedAt: {
    type: Date,
    default: Date.now // A bejegyzés pontos ideje
  }
}, { _id: false }); // Felesleges külön _id-t generálni a belső tömbelemeknek

// 2. A fő Defect séma
const defectSchema = new Schema({
  deviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true,
    index: true
  },
  currentStatusId: {
    type: Schema.Types.ObjectId,
    ref: 'DefectStatus',
    required: true
  },
  sourceContext: {
    sourceType: {
      type: String,
      enum: ['BATTERY_CHECK', 'PERIODICAL_CHECK'],
      required: true
    },
    checkId: {
      type: Schema.Types.ObjectId,
      required: true
      // Nincs explicit 'ref', mert a hivatkozott tábla a sourceType-tól függ (dinamikus)
    }
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null // Ha már valaki dolgozik rajta (karbantartó)
  },
  history: {
    type: [defectHistorySchema], // A fenti alséma tömbje
    default: []
  }
}, {
  timestamps: true // Létrehozás (createdAt) és utolsó módosítás (updatedAt) ideje
});

export default mongoose.model('Defect', defectSchema);
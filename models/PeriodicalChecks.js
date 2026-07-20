import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const periodicalCheckSchema = new Schema({
  deviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true,
    index: true
  },
  operatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  basicCheckTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'BasicCheckType',
    required: true
  },
  notes: {
    type: String,
    trim: true,
    default: '' // Bármilyen extra megjegyzés az operátortól
  },
  defectFound: {
    type: Boolean,
    required: true,
    default: false
  },
  generatedDefectId: {
    type: Schema.Types.ObjectId,
    ref: 'Defect',
    default: null // Ha a defectFound true, a backend ide menti az újonnan létrehozott hiba ID-ját
  }
}, {
  timestamps: true // A createdAt mező adja meg a fizikai ellenőrzés pontos idejét
});
export default mongoose.model('PeriodicalCheck', periodicalCheckSchema);
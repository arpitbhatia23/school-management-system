import { model, Schema } from 'mongoose';

const teacher_profile = new Schema({
  class_incharge: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  blood_group: {
    type: String,
    enum: [
      'A_pos',
      'A_neg',
      'B_pos',
      'B_neg',
      'O_pos',
      'O_neg',
      'AB_pos',
      'AB_neg',
    ],
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  addmission_date: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  attendence: {
    type: Schema.Types.ObjectId,
    required: true,
  },
},{timestamps:true});
export const teacher= model('teacher', teacher_profile);
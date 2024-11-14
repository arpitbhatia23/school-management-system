import mongoose, { model, Schema } from 'mongoose';

const studentProfile = new Schema(
  {
    className: {
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
    parents_Detail: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'parents_Detail',
    },
    address: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['general', 'OBC', 'SC', 'ST'],
      required: true,
    },
    admission_Date: {
      type: String,
      required: true,
    },
    attendance: {
      type: Schema.Types.ObjectId,
      ref: 'Attendance',
    },
    roll_no: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);



export const Student = model('Student', studentProfile);

import { model, Schema } from 'mongoose';

const attendance = new Schema(
  {
    date: {
      type: date,
      required: true,
    },
    status: {
      type: String,
      enum: ['leave', 'present', 'absent'],
    },
  },
  { timestamps: true },
);
export const Attendance = model('attendance', attendance);

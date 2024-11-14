import { model, Schema } from 'mongoose';

const subject = new Schema(
  {
    subject_name: {
      type: String,
      required: true,
    },
    teacher_name: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    days: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
export const Subject = model('subject', subject);

import { model, Schema } from 'mongoose';

const result = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    roll_no: {
      type: Number,
      required: true,
    },
    examtype: {
      type: String,
      required: true,
    },
    pdf: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Result = model('result', result);

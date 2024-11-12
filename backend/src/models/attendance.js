import { Schema } from 'mongoose';

const attendance = new Schema({
  date: {
    type: date,
    required: true,
  },
  status: {
    type: String,
    enum: ['leave', 'present', 'absent'],
  },
});
export default attendance;

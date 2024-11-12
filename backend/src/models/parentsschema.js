import { Schema } from 'mongoose';

const parents_schema = new Schema({
  father_name: {
    type: String,
    required: true,
  },
  mother_name: {
    type: String,
    required: true,
  },
  father_occupation: {
    type: String,

    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
export default parents_schema;

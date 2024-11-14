import { model, Schema } from 'mongoose';

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
},{timestamps:true});
export const parents_Detail= model('parents_Detail', parents_schema)

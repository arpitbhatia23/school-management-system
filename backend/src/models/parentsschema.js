import { model, Schema } from 'mongoose';

const parents_schema = new Schema(
    {
        father_name: {
            type: String,
            required: [true, 'father name is required'],
        },
        mother_name: {
            type: String,
            required: [true, 'mother name is required'],
        },
        father_occupation: {
            type: String,

            required: [true, 'father occupation is rquired'],
        },
        phone: {
            type: Number,
            required: [true, 'phone is required'],
        },
        email: {
            type: String,
            required: [true, 'email is required'],
        },
    },
    { timestamps: true },
);
export const parents_Detail = model('parents_Detail', parents_schema);

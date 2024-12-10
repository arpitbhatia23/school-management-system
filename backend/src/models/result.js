import { model, Schema } from 'mongoose';

const result = new Schema(
    {
        student_id: {
            type: Schema.Types.ObjectId,
            required: [true, 'student id is required'],
        },
        name: {
            type: String,
            required: [true, 'name is required'],
        },
        // roll_no: {
        //     type: Number,
        //     required: [true, 'roll no is required'],
        // },
        examtype: {
            type: String,
            required: [true, 'examtype is required'],
        },
        pdf: {
            type: String,
            required: [true, 'doc is required'],
        },
    },
    {
        timestamps: true,
    },
);
export const Result = model('result', result);

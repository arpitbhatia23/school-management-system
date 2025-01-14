import { model, Schema } from 'mongoose';

const attendance = new Schema(

    {
        student_id:{
            type:String,
            required: [true, 'student_id is required'],

        },
        className:{
        type:String,
        required:"class is required"
        },
        date: {
            type: Date,
            required: [true, 'date is required'],
        },
        status: {
            type: String,
            enum: ['leave', 'present', 'absent'],
            required: [true, 'status is required'],
        },
    },
    { timestamps: true },
);
export const Attendance = model('attendance', attendance);

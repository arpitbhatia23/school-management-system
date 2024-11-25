import { model, Schema } from 'mongoose';

const attendance = new Schema(
    {
        student_id: {
            type: string,
            required: [true, 'student id is required'],
        },
        date: {
            type: date,
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

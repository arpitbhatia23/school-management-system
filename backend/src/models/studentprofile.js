import mongoose, { model, Schema } from 'mongoose';

const studentProfile = new Schema(
    {
        className: {
            type: String,
            required: [true, 'Class name is required'],
        },
        DOB: {
            type: String,
            required: [true, 'Date of birth is required'],
        },
        religion: {
            type: String,
            required: [true, 'Religion is required'],
        },
        blood_group: {
            type: String,
            enum: ['A_pos', 'A_neg', 'B_pos', 'B_neg', 'O_pos', 'O_neg', 'AB_pos', 'AB_neg'],
            required: [true, 'Blood group is required'],
        },
        nationality: {
            type: String,
            required: [true, 'Nationality is required'],
        },
        parents_Detail: {
            type: Schema.Types.ObjectId,
            required: [true, 'Parents detail is required'],
            ref: 'parents_Detail',
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
        },
        category: {
            type: String,
            enum: ['general', 'OBC', 'SC', 'ST'],
            required: [true, 'Category is required'],
        },
        admission_Date: {
            type: String,
            required: [true, 'Admission date is required'],
        },
        attendance: {
            type: Schema.Types.ObjectId,
            ref: 'Attendance',
        },
        roll_no: {
            type: String,
            required: [true, 'Roll number is required'],
            unique: true,
        },
    },
    { timestamps: true },
);

export const Student = model('Student', studentProfile);

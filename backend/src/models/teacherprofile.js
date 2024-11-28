import { model, Schema } from 'mongoose';

const teacher_profile = new Schema(
    {
        class_incharge: {
            type: String,
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
        address: {
            type: String,
            required: [true, 'Address is required'],
        },
        admission_Date: {
            type: String,
            required: [true, 'Addmission date is required'],
        },
        qualification: {
            type: String,
            required: [true, 'Qualification is required'],
        },
        attendence: {
            type: Schema.Types.ObjectId,
        },
    },
    { timestamps: true },
);
export const teacher = model('teacher', teacher_profile);

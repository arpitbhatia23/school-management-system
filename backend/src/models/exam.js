import { model, Schema } from 'mongoose';

const exam = new Schema(
    {
        exam_title: {
            type: String,
            required: [true, 'exam title is required'],
        },
        exam_discription: {
            type: String,
            required: [true, 'exam discription is required'],
        },
        exam_date: {
            type: Date,
            required: [true, 'exam date is required'],
        },
        class: {
            type: String,
            required: [true, 'class is required'],
        },
        file: {
            type: String,
            required: [true, 'file is required'],
        },
    },
    { timestamps: true },
);
export const Exam = model('exam', exam);

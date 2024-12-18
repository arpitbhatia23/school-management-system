import { model, Schema } from 'mongoose';

const syllabus = new Schema(
    {
        title: {
            type: String,
            required: [true, 'title is required'],
        },
        subject: {
            type: Schema.Types.ObjectId,
            required: [true, 'subject is required'],
        },
        className: {
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
export const Syllabus = model('syllabus', syllabus);

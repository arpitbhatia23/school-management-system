import { model, Schema } from 'mongoose';

const subject = new Schema(
    {
        subject_name: {
            type: String,
            required: [true, 'Subject name is required'],
        },
        teacher_id: {
            type: Schema.Types.ObjectId,
            required: [true, 'Teacher id is required'],
        },
        class: {
            type: String,
            required: [true, 'Class is required'],
        },
        days: {
            type: String,
            required: [true, 'Days is required'],
        },
        time: {
            type: String,
            required: [true, 'Time is required'],
        },
    },
    { timestamps: true },
);
export const Subject = model('subject', subject);

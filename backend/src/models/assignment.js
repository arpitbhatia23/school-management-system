import { model, Schema } from 'mongoose';

const assignment = new Schema(
    {
        title: {
            type: String,
            required: [true, 'title is required'],
        },
        class_name: {
            type: String,
            required: [true, 'class is required'],
        },
        due_date: {
            type: String,
            required: [true, 'due date is required'],
        },
        subject: {
            type: String,
            required: [true, 'subject is required'],
        },
        submission: {
            type: Schema.Types.ObjectId,
            ref: 'submission',
        },
    },
    { timestamps: true },
);
export const Assignment = model('assignment', assignment);

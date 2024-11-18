import { model, Schema } from 'mongoose';

const assignment = new Schema(
    {
        title: {
            type: String,
            required: [true, 'title is required'],
        },
        discription: {
            type: String,
            required: [true, 'discription is required'],
        },
        due_date: {
            type: Date,
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

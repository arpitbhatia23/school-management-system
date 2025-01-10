import { model, Schema } from 'mongoose';

const notificationSchema = new Schema(
    {
        title: { type: String, required: true },
        message: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);
export const Notification = model('notification', notificationSchema);

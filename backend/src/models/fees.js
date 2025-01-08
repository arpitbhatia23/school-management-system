import { model, Schema } from 'mongoose';

const fees = new Schema(
    {
        student_id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'paid',"unpaid"],
            default: 'pending',
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
        payment_date: {
            type: Date,
            default: Date.now,
        },
        payment_method: {
            type: String,
            enum: ['cash', 'bank',"online","none"],
            required: true,
        },
    },
    { timestamps: true },
);
export const Fees = model('fees', fees);

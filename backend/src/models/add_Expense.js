import { model, Schema } from 'mongoose';

const add_Expense = new Schema(
    {
        name: {
            type: String,
            required: [true, 'name is required'],
        },
        expense_type: {
            type: String,
            required: [true, 'expense type is required'],
        },
        status: {
            type: String,
            required: [true, 'status is required'],
            enum: ['paid', 'unpaid'],
        },
        amount: {
            type: Number,
            required: [true, 'amount is required'],
        },
        due_date: {
            type: String,
            required: [true, 'due date is required'],
        },
        email: {
            type: String,
            required: [true, 'email is required'],
        },
        phone: {
            type: String,
            required: [true, 'phone is required'],
        },
    },
    { timestamps: true },
);
export const add_expense = model('add_expense', add_Expense);


import { model, Schema } from "mongoose";

const add_Expense =new Schema({
    name:{
        type:String,
        required:true
    },
    expense_type:{
        type:String,
        required:true

    },
    status:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    due_date:{
        type:Date,
        required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
            },

},{timestamps:true})
export const add_expense = model ('add_expense',add_Expense)

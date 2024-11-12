import { model, Schema } from "mongoose";

const assignment =new Schema ({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    due_date:{
        type:Date,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    submission:{
        type:String,
        required:true
    }
})
export const Assignment = model ('assignment',assignment)
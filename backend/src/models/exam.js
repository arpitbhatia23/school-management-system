import { model, Schema } from "mongoose";

const exam = new Schema({
    exam_title:{
        type:String,
        required:true
    },
    exam_discription:{
        type:String,
        required:true
    },
    exam_date:{
        type:Date,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    }
})
export const Exam =model ('exam',exam)
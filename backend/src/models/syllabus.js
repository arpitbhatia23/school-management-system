
import { model, Schema } from 'mongoose';

const syllabus= new Schema({
    title:{
        type:String,
        required:true
    },
    subject:{
        type:Schema.Types.ObjectId,
        required:true
    },
    class :{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    }
})
export const Syllabus =model('syllabus', syllabus)
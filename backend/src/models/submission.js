import mongoose from 'mongoose';
import { Student } from './studentprofile';

const submissionSchema = new mongoose.Schema(
    {
        assignment_id: {
            type: String,
        },
        student:[ {
           student_id:{
            type : mongoose.Schema.Types.ObjectId,
            required: [true, 'student id is required'],
           },
           status:{
            type : String,
            required: [true, 'status is required'],
           }


        }],
    },
    { timestamps: true },
);

export const Submission = mongoose.model('submission', submissionSchema);
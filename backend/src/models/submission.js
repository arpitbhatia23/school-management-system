import mongoose from 'mongoose';
import { Student } from './studentprofile';

const submissionSchema = new mongoose.Schema(
    {
        assignment_id: {
            type: String,
        },
        student_id: {
            type: String,
        },
    },
    { timestamps: true },
);

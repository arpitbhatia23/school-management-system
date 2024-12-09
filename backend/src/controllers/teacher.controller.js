import { Assignment } from '../models/assignment.js';
import { User } from '../models/user.model.js';
import { apiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { apiResponse } from '../utils/apiResponse.js';
import { Exam } from '../models/exam.js';
import { Result } from '../models/result.js';

const getallAssignment = asyncHandler(async (req, res) => {
    const teacher_id = req.user._id;
    const teacher = await User.findById(teacher_id);
    if (!teacher) {
        throw new apiError(404, 'guru ji ni mile 😒');
    }
    console.log(teacher);
    const class_incharge = teacher.profile.class_incharge;
    console.log(class_incharge);
    const assignments = await Assignment.find({ class_name: class_incharge });
    if (!assignments) {
        throw new apiError(404, 'assignments ni mile 😒');
    }

    return res.status(200).json(new apiResponse(200, assignments, 'assignments mili gye'));
});

const addAssignment = asyncHandler(async (req, res) => {
    const { title, class_name, due_date, subject } = req.body;
    if (!(title, class_name, due_date, subject)) {
        throw new apiError(400, 'Please fill all fields');
    }
    const assignment = await Assignment.create({
        title,
        class_name,
        due_date,
        subject,
    });

    if (!assignment) {
        throw new apiError(400, 'something went wrong');
    }
    return res.status(200).json(new apiResponse(200, assignment, 'added successfully'));
});

// add exam
const addExam = asyncHandler(async (req, res) => {
    const { exam_title, exam_discription, exam_date, class_name } = req.body;
    const fileurl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;
    if (!(exam_title, exam_discription, exam_date, class_name, fileurl)) {
        throw new apiError(400, 'all fields are required');
    }
    const exam = await Exam.create({
        exam_title,
        exam_discription,
        exam_date,
        class_name,
        file: fileurl,
    });
    if (!exam) {
        throw new apiError(400, 'something went wrong');
    }
    return res.status(200).json(new apiResponse(200,exam,"added successfully"))
})

// add result
const addResult = asyncHandler(async(req,res)=>{
    const {student_id,name,examtype} = req.body

    const pdfurl =`${req.protocol}://${req.get('host')}/files/${req.file.filename}`;
    if(!(student_id,name,examtype,pdfurl)){
        throw new apiError(400,"all field are required")
    }
    const result = await Result.create({
        student_id,
        name,
        examtype,
        pdf:pdfurl
    });
    if(!result){
        throw new apiError(400,"kuch toh gadbad hai daya 🧐🧐")
    }
    return res.status(200).json(new apiResponse(200,result," tusa re karname hoyi gye upload"))

   
})

export { addAssignment, getallAssignment, addExam,addResult };

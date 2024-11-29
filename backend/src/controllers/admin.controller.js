import { isValidObjectId } from 'mongoose';
import { User } from '../models/user.model.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
import { Subject } from '../models/subject.js';
import {add_expense} from "../models/add_Expense.js"
import { parents_Detail } from '../models/parentsschema.js';

// Get student
const getStudent = asyncHandler(async (req, res) => {
    const { className, name } = req.body;

    // Execute aggregation
    const students = await User.aggregate([
        {
            $match: {
                role: 'student',
                $or: [{ 'profile.className': className }, { name: name }],
            },
        },
        {
            $lookup: {
                from: "parents_details", // Replace with the actual parent collection name
                localField: "profile.parents_Detail",
                foreignField: "_id",
                as: "parents_Detail"
            }
        },
        {
            $unwind: {
                path: '$parents_Detail',
                preserveNullAndEmptyArrays: true,
            },
        },
        // {
        //     $addFields: {
        //         parents_Detail: {
        //             $ifNull: ["$parents_Detail", []]
        //         }
        //     }
        // },
        {
            $project: {
                _id: 1,
                name: 1,
                gender: 1,
                profile: {
                    roll_no: '$profile.roll_no',
                    category: '$profile.category',
                    DOB: '$profile.DOB',
                    bloodGroup: '$profile.blood_group',
                    class: '$profile.className',
                    religion: '$profile.religion',
                    nationality: '$profile.nationality',
                    address: '$profile.address',
                },
                parents_Detail: {
                    father_name: '$parents_Detail.father_name',
                    mother_name: '$parents_Detail.mother_name',
                    parents_contact: '$parents_Detail.phone',
                    parents_email: '$parents_Detail.email',
                    father_occupation: '$parents_Detail.father_occupation',
                },
                profile_image: { image_url: '$profile_image.url' },
            },
        },
    ]);

    if (students.length === 0) {
        throw new apiError(404, 'No students found');
    }

    return res.status(200).json(new apiResponse(200, students, 'Students found'));
});

// getstudent by id

const getStudentById = asyncHandler(async (req, res) => {
    const { student_id } = req.params;

    if (!student_id) {
        throw new apiError(400, 'student id is required');
    }
    if (!isValidObjectId(student_id)) {
        throw new apiError(400, 'invalid student id');
    }
    console.log(student_id);

    const student = await User.aggregate([
        {
            $match: {
                role: 'student',
                _id: new mongoose.Types.ObjectId(student_id),
            },
        },
        {
            $lookup: {
                from: 'parents_details',
                localField: 'profile.parents_Detail',
                foreignField: '_id',
                as: 'parents_Detail',
            },
        },
        {
            $unwind: {
                path: '$parents_Detail',
                preserveNullAndEmptyArrays: true,
            },
        },
        // {
        //     $addFields: {
        //         parents_Detail: {
        //             $ifNull: ["$parents_Detail", []]
        //         }
        //     }
        // },
        {
            $project: {
                _id: 1,
                name: 1,
                gender: 1,
                profile: {
                    roll_no: '$profile.roll_no',
                    category: '$profile.category',
                    DOB: '$profile.DOB',
                    bloodGroup: '$profile.blood_group',
                    class: '$profile.className',
                    religion: '$profile.religion',
                    nationality: '$profile.nationality',
                    address: '$profile.address',
                },
                parents_Detail: {
                    father_name: '$parents_Detail.father_name',
                    mother_name: '$parents_Detail.mother_name',
                    parents_contact: '$parents_Detail.phone',
                    parents_email: '$parents_Detail.email',
                    father_occupation: '$parents_Detail.father_occupation',
                },
                profile_image: { image_url: '$profile_image.url' },
            },
        },
    ]);

    if (student.length === 0) {
        throw new apiError(404, 'student not found');
    }

    return res.status(200).json(new apiResponse(200, student, 'student found'));
});
// promote students

const promoteStudents = asyncHandler(async (req, res) => {
    const { currentClass, name, newClass, phone_no } = req.body;

    if (!(currentClass && name && newClass && phone_no)) {
        throw new apiError(400, 'currentClass,name,newClass,phone_no is required');
    }

    const student = await User.findOne({
        role: 'student',
        'profile.className': currentClass,
        name: name,
        phone_no: phone_no,
    });

    if (!student) {
        throw new apiError(400, 'student not found');
    }

    const updatedStudent = await User.findByIdAndUpdate(
        student._id,
        { 'profile.className': newClass },
        { new: true },
    );

    if (!updatedStudent) {
        throw new apiError(400, 'student not found');
    }

    return res
        .status(200)
        .json(new apiResponse(200, updatedStudent, 'student promoted successfully'));
});

// get all parents

const getAllParents = asyncHandler(async (req, res) => {
    const { name, className } = req.body;
    if (!(name || className)) {
        throw new apiError(400, 'name and class is required');
    }

    const parents = await User.aggregate([
        {
            $match: {
                $or: [{ role: 'student'},{ name: name }, { 'profile.className': className || '' }],
            },
        },
        {
            $lookup: {
                from: 'parents_details',
                localField: 'profile.parents_Detail',
                foreignField: '_id',
                as: 'parents',
            },
        },
        { $unwind: '$parents' },

        {
            $project: {
                _id: 0,
                father_name: '$parents.father_name',
                mother_name: '$parents.mother_name',
                father_occupation: '$parents.father_occupation',
                parents_email: '$parents.email',
                parents_phone: '$parents.phone',
                address: '$parents.address',
            },
        },
    ]);

    if (parents.length === 0) {
        throw new apiError(404, 'parents not found');
    }

return res.status(200).json(new apiResponse(200,parents,'parents found'))



})
// get all teacher
const getAllTeacher= asyncHandler(async(req,res)=>{
    const {name,class_incharge}= req.body
    if(!(name||class_incharge))
    {
        throw new apiError(400,'name kne class tere pape pani')
    }
    const teachers= await User.aggregate([
        {
            $match:{
                role:'teacher',
                $or:[{'profile.class_incharge':class_incharge},{name:name}]
            }}
        ])
        if(teachers.length===0){
            throw new apiError(204,'teacher ni aaa')
        }
        return res.status(200).json(new apiResponse(200,teachers,'teachers found'))

}) 
// get teacher by id
const getTeacherById =asyncHandler(async(req,res)=>{
    const {id} =req.body
    if(!id){
        throw new apiError(400,'id tere pape pani ki mmiya 🤦‍♂️😖😡 ')
    }
    const teacher = await User.findById(_id)
    if(!teacher){
        throw new apiError(404,'guru ji ni mile 😒 koi or id pava....')
        }
        return res.status(200).json(new apiResponse(200,teacher,'😁guruji mili gye🤞'))
    })








// add subject

    const addsuject=asyncHandler(async(req,res)=>{
   const {subject_name,class_name,day,teacher_id}=req.body
if([subject_name,class_name,day,teacher_id].some(fileds=>fileds?.trim()==='')){
 throw new apiError(400,'all fields are required')
}
const subject = await Subject.create({
    subject_name,
    class:class_name,
    days:day,
    teacher_id
})

if(!subject){
    throw new apiError(400,'some thing went wrong while registering subject')
}

return res.status(200).json(new apiResponse(200,subject,'subject registered successfully'))

        
    })

 // getall subject 
 const getallsubject=asyncHandler(async(req,res)=>{
    const {subject_name,class_name}=req.body
const sujects=await Subject.aggregate([
    {
    $match:{$or:[
        {subject_name:subject_name||""},
        {class:{$regex: class_name||"",$options:"i"}}]}
    },
    {
        $lookup:{
            from:"users",
            localField:"teacher_id",
            foreignField:"_id",
            as:"teacher"
        }
    },
    {$unwind:"$teacher"},
    {
    $project:{
        subject_name:1,
        days:1,
        class:1,
        teacher_name:"$teacher.name"
    }
    }

    
])
if(sujects.length===0){
    throw new apiError(404,'subject not found')
}

return res.status(200).json(new apiResponse(200,sujects,'sujects found'))
 })

//  update subject
const updateSubject = asyncHandler(async(req,res)=>{
    const {subject_id,subject_name,class_name,days,teacher_id}=req.body
    if(!isValidObjectId(subject_id)){
        throw new apiError(400,"subject_id is required")
    }
    // findby id and update
   const subject =await Subject. findByIdAndUpdate(subject_id,
        {$set:{subject_name,
            class:class_name,
        days,
    teacher_id}},
    {new:true}
        )
    if(!subject){
        throw new apiError(404,'subject not found ')
    }
    return res.status(200).json( new apiResponse(200,subject,"subject updated "))
})

//  get parents byid
 const getParentsById = asyncHandler(async(req,res)=>{
    const {id}= req.body
    if(!id){
        throw new apiError(400,'master ji id dalna bhul gye,Dhyan kon c madam pr hai😁')
    }
    const parents= await parents_Detail.findById(id)
    if(!parents){
throw new apiError(404,"master ji ni mili  vaise kiski mmy ko dhund re ho . ")
    }
    return res.status(200).json(new apiResponse(200,parents,"mil gye ab mt chodna bache ko sari sikayat lgana 😂"))
})

// add new expense
const addNewExpense = asyncHandler(async(req,res)=>{ 
    const {
        name,
        expense_type,
        status,
        amount,
        due_date,
          email,
        phone
                 }=req.body
                 if([name,expense_type,
                    status,
                    amount,
                    due_date,
                      email,
                    phone].some((field)=> field?.trim()==="")){

                      throw new apiError(400,'all fieslds are required')

}
const expense = await add_expense.create({
    name,
    expense_type,
    status,
    amount,
    due_date,
    email,
    phone
})
if(!expense){
    throw new apiError(404,'expense ni add hua😒')
}


               return res.status(200).json (new apiResponse(200,expense,"expense added "))
            
})
// get all expense
const getAllExpense = asyncHandler(async(req,res)=>{
const {name,status,expense_type}=req.body
if(!(name||status||expense_type)){
    throw new apiError(400,'all fields are required')
}

const getExpense= await add_expense.aggregate(
    [
        {
            $match: {
                $or:[
                    {name:name},
                    {status:status},
                    {expense_type:expense_type},
                    
                ],
                }
                },
                {
                    $project:{
                        name:1,
                        expense_type:1,
                        status:1,
                        amount:1,
                        due_date:1,
                        email:1,
                        phone:1
                        }
                        }
                        ])
if(getExpense.length===0){
throw new apiError(404,'no expense found')
}
return res.status(200).json(new apiResponse(200,getExpense,"expense found "))
})

// update parents by id 

const updateParentsById=asyncHandler(async(req,res)=>{
    const {father_name,mother_name,father_occupation,parents_email,parents_phone,parents_id}=req.body
    if(!isValidObjectId(parents_id)){
        throw new apiError(400,'invalid id')
    }
 const  updatedParents =await parents_Detail.findByIdAndUpdate(parents_id,{$set:{father_name,mother_name,father_occupation,parents_email,parents_phone}},{new:true})
 if(!updatedParents){
    throw new apiError(404,"some thing went wrong while updating parents") 

 }
 return res.status(200).json(new apiResponse(200,updatedParents,"parents updated successfully"))

})


export { getStudent,getStudentById ,promoteStudents,getAllParents,getTeacherById,getAllTeacher,addsuject,getallsubject,getAllExpense,getParentsById,addNewExpense,updateSubject,updateParentsById}
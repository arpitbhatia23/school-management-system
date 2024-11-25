import { isValidObjectId } from 'mongoose';
import { User } from '../models/user.model.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';

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
export { getStudent,getStudentById ,promoteStudents,getAllParents}

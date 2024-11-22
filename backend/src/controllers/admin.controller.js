import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get student
const getStudent = asyncHandler(async (req, res) => {
    const { className, name } = req.body;

    // Create a pipeline for the aggregation
    let pipeline = [
        {
            $match: {
                $and: [
                    { className: { $regex: className, $options: 'i' } },
                    { role: { $regex: 'student', $options: 'i' } },
                    { name: { $regex: name, $options: 'i' } }
                ]
            }
        },
        {
            $lookup: {
                from: 'profiles', // Ensure the correct collection name is used
                localField: 'profile', // Assuming 'profile' is the field in 'users' that references 'profiles'
                foreignField: '_id',
                as: 'profile'
            }
        },
        {
            $lookup: {
                from: 'profiles', // Assuming 'parents_detail' is also referencing the 'profiles' collection
                localField: 'parents_detail',
                foreignField: '_id',
                as: 'parents'
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                className: 1, // Fixed the typo from 'clasName' to 'className'
                gender: 1,
                religion: 1,
                nationality: 1,
                DOB: 1,
                profile: 1,
                parents: 1 // Include parents in the projection if needed
            }
        }
    ];

    // Execute the aggregation
    const student = await User.aggregate(pipeline);

    // Check if any students were found
    if (student.length === 0) {
        throw new apiError(404, 'Student not found');
    }

    // Return the found students
    return res.status(200).json(new apiResponse(200, student, 'Student found'));
});

export { getStudent };
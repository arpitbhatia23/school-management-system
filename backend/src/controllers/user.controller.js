import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';
import { parents_Detail } from '../models/parentsschema.js';
import { apiResponse } from '../utils/apiResponse.js';
// import cloudinary from "../utils/cloudinary.js";
import uploadonCloudinary from '../utils/cloudinary.js';
const generateStudentRollNo = async (className) => {
    // Count the number of students in the specified class
    const studentCount = await User.countDocuments({
        role: 'student',
        'profile.className': className,
    });

    console.log(studentCount);
    const rollNo = `${studentCount + 1}`.padStart(3, '0'); // Ensure 3 digits
    return rollNo;
};

const register = asyncHandler(async (req, res) => {
    // Destructure main user details from request body
    const {
        name,
        gender,
        email,
        password,
        role,
        parents_email,
        parents_phone,
        father_occupation,
        mother_name,
        father_name,
        className,
        DOB,
        religion,
        blood_group,
        nationality,
        address,
        category,
        phone_no,
        subject,
        class_incharge,
        qualification,
    } = req.body;
    // Validate required fields
    if ([name, gender, role].some((field) => field?.trim() === '')) {
        throw new apiError(400, 'All user fields are required');
    }

    console.log(name);
    // Handle student-specific logic
    if (role === 'student') {
        const admission_Date =  Date.now();
        if(!admission_Date){
            throw new apiError(500,"some thing went wrong while gentating date")
        }
        // Destructure and validate `parents` details

        if (
            [father_name, mother_name, father_occupation, parents_email, parents_phone].some(
                (field) => field?.trim() === '',
            )
        ) {
            throw new apiError(400, 'All parent fields are required');
        }

        // Destructure and validate additional profile details
        if (
            [
                className,
                DOB,
                religion,
                blood_group,
                nationality,
                address,
                category,
                admission_Date,
            ].some((field) => field?.trim() === '')
        ) {
            throw new apiError(400, 'All profile fields are required');
        }
        const profile = {
            className,
            DOB,
            religion,
            blood_group,
            nationality,
            address,
            category,
        };

        // Register parents' details
        const parentsDetailRecord = await parents_Detail.create({
            father_name,
            mother_name,
            father_occupation,
            phone: parents_phone,
            email: parents_email,
        });

        if (!parentsDetailRecord) {
            throw new apiError(500, 'Error registering parent details');
        }

        // Generate roll number and use DOB as password
        const roll_no = await generateStudentRollNo(className);
        const student_password = DOB;

        // upload profile image on cloudnary
        const avtar = req.file?.path;

        const profile_image = await uploadonCloudinary(avtar);

        // Create user record with profile data
        const user = await User.create({
            name,
            gender,
            email,
            password: student_password,
            role,
            profile: { ...profile, parents_Detail: parentsDetailRecord._id, roll_no },

            phone_no,
            profile_image:{ url:profile_image?.secure_url,
                            public_id:profile_image?.public_id
            },
        });

        if (!user) {
            throw new apiError(500, 'Error registering user');
        }

        // Return successful registration response
        return res.status(201).json(new apiResponse(201, {}, 'student registered successfully'));
    }

    // register teacher
    if (role === 'teacher') {
        const admission_Date =  Date.now();
        if(!admission_Date){
            throw new apiError(500,"some thing went wrong while gentating date")
        }

        if (
            [
                class_incharge,
                religion,
                blood_group,
                nationality,
                qualification,
                phone_no,
                email,
                subject,
                address,
                DOB,
            ].some((field) => field?.trim() === '')
        ) {
            throw new apiError(400, 'All teacher profile fields are required');
        }

        const isUserexit = await User.findOne(
            { $or: [{ email }, { phone_no }] },
            { role: 'teacher' },
        );
        if (isUserexit) {
            throw new apiError(400, 'email or phone number already exist');
        }

        const avatar = req?.file?.path;
        const profile_image = await uploadonCloudinary(avatar);

        const profile = {
            class_incharge,
            religion,
            blood_group,
            nationality,
            qualification,
            phone_no,
            email,
            subject,
            admission_Date,
            address,
            DOB,
        };
        const password = DOB;
        const user = await User.create({
            name,
            gender,
            role,
            profile,
            phone_no,
            email,
            password,
            profile_image: profile_image?.secure_url,
        });

        if (!user) {
            throw new apiError(500, 'Error while registering user');
        }

        return res.status(201).json(new apiResponse(201, {}, 'teacher registered successfully'));
    }
    // register admin

    console.log(role);

    if (role === 'admin') {

        const avatar = req?.file?.path;

        const profile_image = await uploadonCloudinary(avatar);
        if (!(email && password)) {
            throw new apiError(400, 'email and password is required');
        }

        const user = User.create({
            name,
            gender,
            profile_image: profile_image.secure_url,
            role,
            email,
            phone_no,
            password,
        });

        if (!user) {
            throw new apiError(400, 'something went wrong while registering user');
        }
        return res.status(201).json(new apiResponse(201, {}, 'admin create succesfully'));
    }

    throw new apiError(400, 'role is  not matched');
});

// login

const login = asyncHandler();

export { register };

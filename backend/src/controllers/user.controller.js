import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';
import { parents_Detail } from '../models/parentsschema.js';
import { apiResponse } from '../utils/apiResponse.js';
// import cloudinary from "../utils/cloudinary.js";
import uploadonCloudinary, { deleteOnCloudninary } from '../utils/cloudinary.js';
import { generateAccessTokenAndRefreshToken } from '../utils/generateToken.js';
// generate student roll no
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
// register user
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
    console.log(
        'check 1'
    )
    if ([name, gender, role].some((field) => field?.trim() === '')) {
        throw new apiError(400, 'All user fields are required');
    }

    // Handle student-specific logic
    if (role === 'student') {
        const admission_Date = Date.now();
        if (!admission_Date) {
            throw new apiError(500, 'some thing went wrong while gentating date');
        }
        // Destructure and validate `parents` details
        console.log(
            'check 2'
        )
        if (
            [father_name, mother_name, father_occupation, parents_email].some(
                (field) => field?.trim() === ''
            )

        ) {
            throw new apiError(400, 'All parent fields are required');
        }
        console.log(
            'check 3'
        )
        if (!parents_phone) {
            throw new apiError(400,'parents phone no required')
        }
        console.log(
            'check 4'
        )
        console.log(className ,DOB,religion,blood_group,nationality,category,address,admission_Date)
        // Destructure and validate additional profile details
        if (
            
               !(className &&
                DOB &&
                religion &&
                blood_group &&
                nationality &&
                address &&
                category &&
                admission_Date
            )
            
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
        console.log(
            'check 5'
        )

        if (!parentsDetailRecord) {
            throw new apiError(500, 'Error registering parent details');
        }

        // Generate roll number and use DOB as password
        const roll_no = await generateStudentRollNo(className);
        const student_password = DOB;

        // upload profile image on cloudnary
        const avtar = req.file?.path;
        if(!avtar){
            throw new apiError(400, 'Profile image is required');
        }

        const profile_image = await uploadonCloudinary(avtar);
        if (!profile_image) {
            throw new apiError(400,"something went wrong in cloudnary");
            
        }

        console.log('hi', profile_image);
        // Create user record with profile data
        const user = await User.create({
            name,
            gender,
            email,
            password: student_password,
            role,
            profile: { ...profile, parents_Detail: parentsDetailRecord._id, roll_no },

            phone_no,
            profile_image: { url: profile_image?.secure_url, public_id: profile_image?.public_id },
        });
        console.log(
            'check 6'
        )

        if (!user) {
            throw new apiError(500, 'Error registering user');
        }
        const createdUser = await User.findById(user._id).select('-password -refreshToken');

        // Return successful registration response
        return res
            .status(201)
            .json(new apiResponse(201, createdUser, 'student registered successfully'));
    }

    // register teacher
    if (role === 'teacher') {
        const admission_Date = Date.now();
        if (!admission_Date) {
            throw new apiError(500, 'some thing went wrong while gentating date');
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
        if(!avatar){
            throw new apiError(400,"image is required");
            
        }
        const profile_image = await uploadonCloudinary(avatar);
        if(!profile_image){
            throw new apiError(400, 'Error uploading image')
        }

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
            profile_image: { url: profile_image?.secure_url, public_id: profile_image?.public_id },
        });

        if (!user) {
            throw new apiError(500, 'Error while registering user');
        }
        const createdUser = await User.findById(user._id).select('-password -refreshToken');
        return res
            .status(201)
            .json(new apiResponse(201, createdUser, 'teacher registered successfully'));
    }
    // register admin

    console.log(role);

    if (role === 'admin') {
        const avatar = req?.file?.path;
        if(!avatar){
            throw new apiError(400,"image is required");
        }

        const profile_image = await uploadonCloudinary(avatar);
        if(!profile_image)
        {
            throw new apiError(400, 'Error uploading image')
        }
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
        const createdUser = await User.findById(user._id).select('-password -refreshToken');
        return res.status(201).json(new apiResponse(201, createdUser, 'admin create succesfully'));
    }

    throw new apiError(400, 'role is  not matched');
});

// login

const login = asyncHandler(async (req, res) => {
    const { email, password, phone_no } = req.body;

    if (!(email || phone_no)) {
        throw new apiError(400, 'email and phone_no is required');
    }
    if (!password) {
        throw new apiError(400, 'password is required');
    }

    const user = await User.findOne({ $or: [{ email }, { phone_no }] });
    if (!user) {
        throw new apiError(400, 'user not find');
    }

    const isValidPassword = await user.isPasswordcorrect(password);
    if (!isValidPassword) {
        throw new apiError(401, 'invailed password');
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');
    const option = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie('acessToken', accessToken, option)
        .cookie('refreshToken', refreshToken, option)
        .json(
            new apiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                'user login suceesfully',
            ),
        );
});

// update profile image 
const updateProfileImage = asyncHandler(async (req, res) => {
    const  image  = req?.file?.path;
    const { id } = req.user;
    const user = await User.findById(id);
    if (!image) {
        throw new apiError(400,'image is required')
    }
    if (!user) {
        throw new apiError(400, 'user not found');
    }
    const newImage = await uploadonCloudinary(image
        );
        if(!newImage){
            throw new apiError(400,'image upload failed')
        }
        const  image_id= user?.profile_image?.public_id
        const deleteImage =await deleteOnCloudninary(image_id)

        user.profile_image = {url:newImage?.url,public_id:newImage.public_id}
        await user.save({validateBeforeSave:false})
        return res.status(200).json(
            new apiResponse(200,{}, 'profile image updated successfully')
            )


})


//change password

const change_password=asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} = req.body;
    if(!(oldPassword && newPassword)){
        throw new apiError(400,'old password and new password is required')
    }
    const _id=req.user._id;
    const user=await User.findById(_id);
    const isValidPassword = await user.isPasswordcorrect(oldPassword);
    if(!isValidPassword){
        throw new apiError(401,'invalid old password')
    }

    user.password=newPassword
    await user.save({validateBeforeSave:false})
return res.status(200).json(new apiResponse(200,{},'password changed successfully'))

})


export { register, login,change_password,updateProfileImage };

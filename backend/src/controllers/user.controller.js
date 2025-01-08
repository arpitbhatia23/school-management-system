import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';
import { parents_Detail } from '../models/parentsschema.js';
import { apiResponse } from '../utils/apiResponse.js';
// import cloudinary from "../utils/cloudinary.js";
import uploadonCloudinary, { deleteOnCloudninary } from '../utils/cloudinary.js';
import { generateAccessTokenAndRefreshToken } from '../utils/generateToken.js';

import jwt from 'jsonwebtoken';
// generate student roll no
const generateStudentRollNo = async (className) => {
    // Count the number of students in the specified class
    const studentCount = await User.countDocuments({
        role: 'student',
        'profile.className': className,
    });

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
        if (
            [father_name, mother_name, father_occupation, parents_email].some(
                (field) => field?.trim() === '',
            )
        ) {
            throw new apiError(400, 'All parent fields are required');
        }
        if (!parents_phone) {
            throw new apiError(400, 'parents phone no required');
        }
        console.log(
            className,
            DOB,
            religion,
            blood_group,
            nationality,
            category,
            address,
            admission_Date,
        );
        // Destructure and validate additional profile details
        if (
            !(
                className &&
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

        if (!parentsDetailRecord) {
            throw new apiError(500, 'Error registering parent details');
        }

        // Generate roll number and use DOB as password
        const roll_no = await generateStudentRollNo(className);
        const student_password = DOB;

        // upload profile image on cloudnary
        const avtar = req.file?.path;
       console.log(avtar)
        if (!avtar) {
            throw new apiError(400, 'Profile image is required');
        }

        const profile_image = await uploadonCloudinary(avtar);
        if (!profile_image) {
            throw new apiError(400, 'something went wrong in cloudnary');
        }

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
                religion,
                blood_group,
                nationality,
                qualification,
                phone_no,
                email,
                address,
                DOB,
            ].some((field) => field?.trim() === '')
        ) {
            throw new apiError(400, 'All teacher profile fields are required');
        }

        const isUserexit = await User.findOne({ role: 'teacher', $or: [{ email }, { phone_no }] });
        if (isUserexit) {
            throw new apiError(400, 'email or phone number already exist');
        }

        const avatar = req?.file?.path;
        if (!avatar) {
            throw new apiError(400, 'image is required');
        }
        const profile_image = await uploadonCloudinary(avatar);
        if (!profile_image) {
            throw new apiError(400, 'Error uploading image');
        }

        const profile = {
            class_incharge,
            religion,
            blood_group,
            nationality,
            qualification,
            phone_no,
            email,
            admission_Date,
            address,
            DOB,
            subject
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
        if (!avatar) {
            throw new apiError(400, 'image is required');
        }

        const profile_image = await uploadonCloudinary(avatar);
        if (!profile_image) {
            throw new apiError(400, 'Error uploading image');
        }
        if (!(email && password)) {
            throw new apiError(400, 'email and password is required');
        }

        const user = await User.create({
            name,
            gender,
            profile_image: { url: profile_image.secure_url, public_id: profile_image.public_id },
            role,
            email,
            phone_no,
            password,
        });

        if (!user) {
            throw new apiError(400, 'something went wrong while registering user');
        }

        console.log(user);
        const createdUser = await User.findById(user._id).select('-password -refreshToken');
        console.log(createdUser);
        return res.status(201).json(new apiResponse(201, createdUser, 'admin create succesfully'));
    }

    throw new apiError(400, 'role is  not matched');
});

// login

const login = asyncHandler(async (req, res) => {
    const { email, password, phone_no, role } = req.body;
    if (!(email || phone_no)) {
        throw new apiError(400, 'email and phone_no is required');
    }

    if (!(password && role)) {
        throw new apiError(400, 'password and role are required');
    }

    const user = await User.findOne({ $or: [{ email }, { phone_no }], role });
    if (!user) {
        throw new apiError(400, 'user not find');
    }

    const isValidPassword = await user.isPasswordcorrect(password);
    if (!isValidPassword) {
        throw new apiError(401, ' invalid password');
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');
    loggedInUser.refreshToken = refreshToken;
    await loggedInUser.save({ validateBeforeSave: false });
    const option = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
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
    const image = req?.file?.path;
    const { id } = req.user;
    const user = await User.findById(id);
    if (!image) {
        throw new apiError(400, 'image is required');
    }
    if (!user) {
        throw new apiError(400, 'user not found');
    }
    const newImage = await uploadonCloudinary(image);
    if (!newImage) {
        throw new apiError(400, 'image upload failed');
    }
    const image_id = user?.profile_image?.public_id;
    const deleteImage = await deleteOnCloudninary(image_id);
    if (!deleteImage) {
        throw new apiError(400, 'image delete failed');
    }
    user.profile_image = { url: newImage?.url, public_id: newImage.public_id };
    await user.save({ validateBeforeSave: false });
    return res.status(200).json(new apiResponse(200, {}, 'profile image updated successfully'));
});

//change password

const change_password = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        throw new apiError(400, 'old password and new password is required');
    }
    const _id = req.user._id;
    const user = await User.findById(_id);
    const isValidPassword = await user.isPasswordcorrect(oldPassword);
    if (!isValidPassword) {
        throw new apiError(401, 'invalid old password');
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res.status(200).json(new apiResponse(200, {}, 'password changed successfully'));
});

// update profile
const update_profile_detail = asyncHandler(async (req, res) => {
    const { name, gender, phone_no, email } = req.body;

    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
        throw new apiError(400, 'user not found ');
    }

    const updatedUser = await User.findByIdAndUpdate(
        _id,
        { name, gender, phone_no, email },
        { new: true },
    );

    if (!updatedUser) {
        throw new apiError(500, 'something went wrong while updating profile');
    }

    return res.status(200).json(new apiResponse(200, updatedUser, 'profile updated successfully'));
});

const logout = asyncHandler(async (req, res) => {
    const _id = req?.user?._id;
    await User.findByIdAndUpdate(
        _id,
        {
            $unset: { refreshToken: 1 },
        },
        { new: true },
    );

    return res.status(200).json(new apiResponse(200, {}, 'user logout successfully'));
});
// update refreshtoken
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    // Check if refresh token is provided
    if (!incomingRefreshToken) {
        throw new apiError(401, 'Unauthorized request - refresh token is missing');
    }

    try {
        // Verify the incoming refresh token
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESHTOKENSECRET);
        console.log('Decoded Token:', decodedToken);

        // Fetch the user from the database
        const user = await User.findById(decodedToken?._id);
        if (!user) {
            throw new apiError(401, 'Invalid refresh token - user not found');
        }

        // Check if the refresh token matches
        if (incomingRefreshToken !== user.refreshToken) {
            throw new apiError(401, 'Refresh token is expired or already used');
        }

        // Generate new tokens
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

        // Update the user's refresh token in the database
        user.refreshToken = refreshToken;
        await user.save();

        // Set cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: true, // Only secure in production
            sameSite: 'strict',
        };

        // Send the new tokens in cookies and response
        return res
            .status(200)
            .cookie('acessToken', accessToken, { ...cookieOptions }) // Correct name
            .cookie('refreshToken', refreshToken, {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }) // Refresh token persistent
            .json(
                new apiResponse(
                    200,
                    {
                        newRefreshToken: refreshToken,
                        accessToken,
                    },
                    'Access token refreshed successfully',
                ),
            );
    } catch (error) {
        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            throw new apiError(401, 'Refresh token expired, please log in again');
        } else if (error.name === 'JsonWebTokenError') {
            throw new apiError(401, 'Invalid token');
        } else {
            throw new apiError(401, error.message || 'Authentication error');
        }
    }
});

// current user

const currentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new apiResponse(200, req.user, 'current user'));
});

export {
    register,
    login,
    change_password,
    updateProfileImage,
    update_profile_detail,
    logout,
    refreshAccessToken,
    currentUser,
};

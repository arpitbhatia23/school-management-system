import { apiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
export const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.acessToken || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new apiError(401, 'unauthorized request');
        }

        const decodetokeninfo = jwt.verify(token, process.env.ACCESSTOKENSECRET);
        const user = await User.findById(decodetokeninfo?._id).select('-password -refreshToken');
        if (!user) {
            console.log(401, 'invalid access token');
            throw new apiError(401, 'invalid access token');
        }
        req.user = user;
    } catch (error) {
        console.log(401, error?.message || 'unauthorized request');
        throw new apiError(401, error?.message || 'unauthorized request');
    }
    next();
});

export const verifyAdmin = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.acessToken || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        throw new apiError(401, 'unauthorized request');
    }
    const decodetokeninfo = jwt.verify(token, process.env.ACCESSTOKENSECRET);
    if (decodetokeninfo?.role !== 'admin') {
        throw new apiError(401, 'unauthorized request only admin can access');
    }
    next();
});

export const verifyTeacher=asyncHandler(async(req,res,next)=>{
    const token = req.cookies?.acessToken || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        throw new apiError(401, 'unauthorized request');
    }
    const decodetokeninfo = jwt.verify(token, process.env.ACCESSTOKENSECRET);
    if (decodetokeninfo?.role !== 'teacher') {
        throw new apiError(401, 'unauthorized request only admin can access');
    }
    next();})
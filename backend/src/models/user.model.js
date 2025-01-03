import mongoose, { Schema } from 'mongoose';
import { Student } from './studentprofile.js';
import { teacher } from './teacherprofile.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        phone_no: {
            type: Number,
            required: [true, 'Phone number is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'transgender'],
            required: [true, 'Gender is required'],
        },
        role: {
            type: String,
            enum: ['student', 'admin', 'teacher'],
        },
        profile: {
            type: Schema.Types.Mixed,
        },
        profile_image: {
            type: {
                url: String,
                public_id: String,
            },
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', function (next) {
    if (this.role === 'student') {
        const { error } = Student(this.profile);
        if (error) return next(new Error(`Invalid student profile: ${error.message}`));
    } else if (this.role === 'teacher') {
        const { error } = teacher.validate(this.profile);
        if (error) return next(new Error(`Invalid teacher profile: ${error.message}`));
    }
    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await argon2.hash(this.password, { type: argon2.argon2id });
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await argon2.verify(this.password, password);
};

userSchema.methods.isPasswordcorrect = async function (password) {
    console.log(password);
    return await argon2.verify(this.password, password);
};
userSchema.methods.generateaccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
            name: this.name,
        },
        process.env.ACCESSTOKENSECRET,
        {
            expiresIn: process.env.ACCESSTOKENEXPIRY,
        },
    );
};

userSchema.methods.generaterefreshtoken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESHTOKENSECRET,
        {
            expiresIn: process.env.REFRESHTOKENEXPIRY,
        },
    );
};

export const User = mongoose.model('User', userSchema);

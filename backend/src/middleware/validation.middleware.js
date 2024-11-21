import { apiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
export const validate = asyncHandler(async (req, res, next) => {
    const { email, phone_no, parents_phone, parents_email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
    const numberRegex = /^\d{10}$/; // Phone number validation regex

    if (email && !emailRegex.test(email)) {
        throw new apiError(400, 'Invalid email');
    }

    if (phone_no && !numberRegex.test(phone_no)) {
        throw new apiError(400, 'Invalid phone');
    }

    if (parents_phone && !numberRegex.test(parents_phone)) {
        throw new apiError(400, 'Invalid parents_phone');
    }
    if (parents_email && !emailRegex.test(parents_email)) {
        throw new apiError(400, 'Invalid parents_email');
    }

    next();
});

import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

export const validate = (req, res, next) => {
    const { email, phone_no, parents_phone } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
    const numberRegex = /^\d{10}$/; // Phone number validation regex

let isvalid=false

    if (email && !emailRegex.test(email)) {
       throw new apiError(400, 'Invalid email')
    }

    if (phone_no && !numberRegex.test(phone_no)) {
        throw new apiError(400, 'Invalid phone')
    }

    if (parents_phone && !numberRegex.test(parents_phone)) {
        throw new apiError(400, 'Invalid parents_phone')
    }


   next()
};

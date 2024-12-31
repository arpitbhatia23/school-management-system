import rateLimit from "express-rate-limit"

export const loginRateLimit=rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: 'Too many attempts, please try later.',
})
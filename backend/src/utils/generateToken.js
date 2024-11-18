import { User } from '../models/user.model.js';
export const generateAccessTokenAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID);
        const accessToken = await user.generateaccessToken();
        const refreshToken = await user.generaterefreshtoken();
        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new apiError(500, 'something went wrong while generating refresh and access token');
    }
};

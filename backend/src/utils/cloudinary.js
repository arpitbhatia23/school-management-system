import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRETKEY,
});
const uploadonCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null;
        // console.log("localfilepath", localfilepath)
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: 'auto',
            folder: 'school_management_system',
            format: 'webp',
            transformation: [
                {
                    aspect_ratio: '1:1',
                    gravity: 'face',
                    width: 600,
                    height: 700,
                    crop: 'fill',
                    quality: 'auto',
                },
            ],
        });
        fs.unlinkSync(localfilepath);
        // console.log('response', response);
        return response;
    } catch (error) {
        console.log(error);
        fs.unlinkSync(localfilepath);
    }
};

const deleteOnCloudninary = async (public_id) => {
    try {
        if (!public_id) {
            return null;
        }
        await cloudinary.uploader.destroy(public_id, { resource_type: 'image' });
    } catch (error) {
        console.log(error.message);
    }
};
export default uploadonCloudinary;
export { deleteOnCloudninary };

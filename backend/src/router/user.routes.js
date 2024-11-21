import { Router } from 'express';
import { change_password, login, register, update_profile_detail, updateProfileImage } from '../controllers/user.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import { verifyJwt } from '../middleware/auth.middelware.js';
const router = Router();
router.route('/register').post(upload.single('profile_image'), validate, register);
router.route('/login').get(validate, login);
router.route('/update_image').patch(verifyJwt, upload.single('profile_image'),updateProfileImage);
router.route('/change_password').patch(verifyJwt, change_password)
router.route("/updateprofile").patch(verifyJwt,update_profile_detail)

export default router;

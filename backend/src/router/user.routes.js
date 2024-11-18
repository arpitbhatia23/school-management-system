import { Router } from 'express';
import { register } from '../controllers/user.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
const router = Router();
router.route('/register').post(upload.single('profile_image'),validate, register);

export default router;

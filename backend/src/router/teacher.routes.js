import { Router } from 'express';
import { verifyJwt } from '../middleware/auth.middelware.js';
import { addAssignment, addAttendance, addExam, getallAssignment } from '../controllers/teacher.controller.js';
import { uploadFile } from '../middleware/multer.middleware.js';

const router = Router();
router.route('/addAssignment').post(verifyJwt, addAssignment);
router.route('/getallAssignment').get(verifyJwt, getallAssignment);
router.route('/addExam').post(uploadFile.single('file'), verifyJwt, addExam);
router.route("/addAttendance").post(verifyJwt,addAttendance)
export default router;

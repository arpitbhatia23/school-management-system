import { Router } from 'express';
import { verifyJwt } from '../middleware/auth.middelware.js';
import { addAssignment, addAttendance, addExam, getallAssignment,addResult } from '../controllers/teacher.controller.js';

const router = Router();
router.route('/addAssignment').post(verifyJwt, addAssignment);
router.route('/getallAssignment').get(verifyJwt, getallAssignment);
router.route('/addExam').post(uploadFile.single('file'), verifyJwt, addExam);
router.route("/addAttendance").post(verifyJwt,addAttendance)
router.route('/addResult').post(uploadFile.single('file'),verifyJwt,addResult);

export default router;

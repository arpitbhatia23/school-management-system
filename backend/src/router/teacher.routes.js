import { Router } from 'express';
import { verifyJwt, verifyTeacher } from '../middleware/auth.middelware.js';
import {
    addAssignment,
    addAttendance,
    addExam,
    getallAssignment,
    addResult,
    getStudents,
    genIdCard,
    addSyllabus,
} from '../controllers/teacher.controller.js';
import { uploadFile } from '../middleware/multer.middleware.js';
const router = Router();
router.route('/addAssignment').post(verifyJwt, verifyTeacher, addAssignment);
router.route('/getallAssignment').get(verifyJwt, verifyTeacher, getallAssignment);
router.route('/addExam').post(uploadFile.single('file'), verifyJwt, verifyTeacher, addExam);
router.route('/addAttendance').post(verifyJwt, verifyTeacher, addAttendance);
router.route('/addResult').post(uploadFile.single('file'), verifyJwt, verifyTeacher, addResult);
router.route('/getStudent').get(verifyJwt, verifyTeacher, getStudents);
router.route('/genidcard').get(verifyJwt, verifyTeacher, genIdCard);
router.route('/addSyllabus').post(uploadFile.single('file'), verifyJwt, verifyTeacher, addSyllabus);
export default router;

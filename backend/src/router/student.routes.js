import Router from 'express';
import { verifyJwt, verifystudent } from '../middleware/auth.middelware.js';
import {
    genIdCard,
    getMonthlyAttendance,
    getResult,
    getSyllabus,
    getexam,
    getnotification,
    getsubjects,
} from '../controllers/students.controller.js';
const router = Router();
router.route('/genidcard').get(verifyJwt, verifystudent, genIdCard);
router.route('/getMonthlyAttendance').post(verifyJwt, verifystudent, getMonthlyAttendance);
router.route('/getResult').get(verifyJwt, verifystudent, getResult);
router.route('/getexam').get(verifyJwt, verifystudent, getexam);
router.route('/getSyllabus').get(verifyJwt, verifystudent, getSyllabus);
router.route('/getnotification').get(verifyJwt, verifystudent, getnotification);
router.route('/getsubject').get(verifyJwt, verifystudent, getsubjects);

export default router;

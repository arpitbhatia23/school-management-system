import Router from 'express';
import { verifyJwt, verifystudent } from '../middleware/auth.middelware.js';
import {
    genIdCard,
    getMonthlyAttendance,
    getResult,
    getSyllabus,
    getexam,
} from '../controllers/students.controller.js';
const router = Router();
router.route('/genidcard').get(verifyJwt, verifystudent, genIdCard);
router.route('/getMonthlyAttendance').get(verifyJwt, verifystudent, getMonthlyAttendance);
router.route('/getResult').get(verifyJwt, verifystudent, getResult);
router.route('/getexam').get(verifyJwt, verifystudent, getexam);
router.route('/getSyllabus').get(verifyJwt,verifystudent,getSyllabus)
export default router;

import { Router } from 'express';
import { verifyAdmin, verifyJwt } from '../middleware/auth.middelware.js';
import {
    addsuject,
    getAllParents,
    getallsubject,
    getAllTeacher,
    getStudent,
    getStudentById,
    getTeacherById,
    promoteStudents,
    getParentsById,
    addNewExpense,
    getAllExpense,
    updateParentsById,
    updateSubject,
    addFees,
    getfees,
    addNotification,
    getNotification,
    deleteNotification,
    deleteStudentbyID,
} from '../controllers/admin.controller.js';
import { totalExpense, totalfee, totalstudentGender, totalteacher } from '../controllers/adminDashboard.js';
const router = Router();
router.route('/getstudent').post(verifyJwt, verifyAdmin, getStudent);
router.route('/getstudentbyid/:student_id').post(verifyJwt, verifyAdmin, getStudentById);
router.route('/promoteStudent').post(verifyJwt, verifyAdmin, verifyAdmin, promoteStudents);
router.route('/getallparents').post(verifyJwt, verifyAdmin, getAllParents);
router.route('/getTeacher').get(verifyJwt, verifyAdmin, getAllTeacher);
router.route('/getTeacherById').get(verifyJwt, verifyAdmin, getTeacherById);
router.route('/addSubject').post(verifyJwt, verifyAdmin, addsuject);
router.route('/getallsubject').get(verifyJwt, verifyAdmin, getallsubject);
router.route('/getparentsById').get(verifyJwt, getParentsById);
router.route('/addNewExpense').post(verifyJwt, addNewExpense);
router.route('/getAllExpense').get(verifyJwt, getAllExpense);
router.route('/updateParentsById').patch(verifyJwt, verifyAdmin, updateParentsById);
router.route('/updateSubject').patch(verifyJwt, verifyAdmin, updateSubject);
router.route('/addfees').post(verifyJwt, verifyAdmin, addFees);
router.route('/getfees').get(verifyJwt, verifyAdmin, getfees);
router.route('/addnotification').post(verifyJwt,verifyAdmin,addNotification)
router.route("/getnotification").get(verifyJwt,verifyAdmin,getNotification)
router.route("/deleteNotification").delete(verifyJwt,verifyAdmin,deleteNotification)
router.route("/totalstudent").get(verifyJwt,verifyAdmin,totalstudentGender)
router.route("/totalfees").get(verifyJwt,verifyAdmin,totalfee)
router.route("/totalexpense").get(verifyJwt,verifyAdmin,totalExpense)
router.route("/totalteacher").get(verifyJwt,verifyAdmin,totalteacher)
router.route('/deletestudentbyid').post(verifyJwt, verifyAdmin,deleteStudentbyID);

export default router;

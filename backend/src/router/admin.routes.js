import { Router } from "express";
import { verifyAdmin, verifyJwt } from "../middleware/auth.middelware.js";
import { addsuject, getAllParents, getallsubject, getAllTeacher, getStudent ,getStudentById, getTeacherById, promoteStudents,getParentsById,addNewExpense,getAllExpense, updateParentsById, updateSubject} from "../controllers/admin.controller.js";
const router =Router()
router.route('/getstudent').get(verifyJwt,verifyAdmin,getStudent)
 router.route('/getstudentbyid/:student_id').get(verifyJwt,verifyAdmin,getStudentById)
router.route("/promoteStudent").post(verifyJwt, verifyAdmin,verifyAdmin, promoteStudents)
router.route("/getallparetns").get(verifyJwt,verifyAdmin,getAllParents)
router.route('/getTeacher').get(verifyJwt,verifyAdmin,getAllTeacher)
router.route("/getTeacherById").get(verifyJwt,verifyAdmin,getTeacherById)
router.route("/addSubject").post(verifyJwt,verifyAdmin,addsuject)
router.route("/getallsubject").get(verifyJwt,verifyAdmin,getallsubject)
router.route('/getparentsById').get(verifyJwt,getParentsById)
router.route('/addNewExpense').post(verifyJwt,addNewExpense)
router.route('/getAllExpense').get(verifyJwt,getAllExpense)
router.route('/updateParentsById').patch(verifyJwt,verifyAdmin,updateParentsById)
router.route('/updateSubject').patch(verifyJwt,verifyAdmin,updateSubject)
export default router


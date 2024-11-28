import { Router } from "express";
import { verifyAdmin, verifyJwt } from "../middleware/auth.middelware.js";
import { addNewExpense, getAllExpense, getAllParents, getAllTeacher, getParentsById, getStudent ,getStudentById, getTeacherById, promoteStudents} from "../controllers/admin.controller.js";
const router =Router()
router.route('/getstudent').get(verifyJwt,getStudent)
 router.route('/getstudentbyid/:student_id').get(verifyJwt,getStudentById)
router.route("/promoteStudent").post(verifyJwt, verifyAdmin, promoteStudents)
router.route("/getallparents").get(verifyJwt,getAllParents)
router.route('/getTeacher').get(verifyJwt,getAllTeacher)
router.route("/getTeacherById").get(verifyJwt,getTeacherById)
router.route('/getparentsById').get(verifyJwt,getParentsById)
router.route('/addNewExpense').post(verifyJwt,addNewExpense)
router.route('/getAllExpense').get(verifyJwt,getAllExpense)
export default router


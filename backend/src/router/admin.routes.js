import { Router } from "express";
import { verifyAdmin, verifyJwt } from "../middleware/auth.middelware.js";
import { getAllParents, getAllTeacher, getStudent ,getStudentById, getTeacherById, promoteStudents} from "../controllers/admin.controller.js";
const router =Router()
router.route('/getstudent').get(verifyJwt,getStudent)
 router.route('/getstudentbyid/:student_id').get(verifyJwt,getStudentById)
router.route("/promoteStudent").post(verifyJwt, verifyAdmin, promoteStudents)
router.route("/getallparetns").get(verifyJwt,getAllParents)
router.route('/getTeacher').get(verifyJwt,getAllTeacher)
router.route("/getTeacherById").get(verifyJwt,getTeacherById)
export default router


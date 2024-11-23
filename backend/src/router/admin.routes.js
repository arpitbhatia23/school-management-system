import { Router } from "express";
import { verifyAdmin, verifyJwt } from "../middleware/auth.middelware.js";
import { getStudent ,getStudentById, promoteStudents} from "../controllers/admin.controller.js";
const router =Router()
router.route('/getstudent').get(verifyJwt,getStudent)
 router.route('/getstudentbyid/:student_id').get(verifyJwt,getStudentById)
router.route("/promoteStudent").post(verifyJwt, verifyAdmin, promoteStudents)

export default router


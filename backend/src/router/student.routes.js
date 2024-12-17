import Router from "express"
import { verifyJwt } from "../middleware/auth.middelware.js"
import { genIdCard, getexam, getMonthlyAttendance } from "../controllers/students.controller.js"
const router=Router()
router.route("/genidcard").get(verifyJwt,genIdCard)
router.route('/getMonthlyAttendance').get(verifyJwt,getMonthlyAttendance)
router.route("/getexam").get(verifyJwt,getexam)
export default router
import Router from "express"
import { verifyJwt } from "../middleware/auth.middelware.js"
import { genIdCard, getMonthlyAttendance, getResult,getexam } from "../controllers/students.controller.js"
const router=Router()
router.route("/genidcard").get(verifyJwt,genIdCard)
router.route('/getMonthlyAttendance').get(verifyJwt,getMonthlyAttendance)
router.route('/getResult').get(verifyJwt,getResult)
router.route("/getexam").get(verifyJwt,getexam)
export default router
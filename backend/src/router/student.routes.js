import Router from "express"
import { verifyJwt } from "../middleware/auth.middelware.js"
import { genIdCard } from "../controllers/students.controller.js"
const router=Router()
router.route("/genidcard").get(verifyJwt,genIdCard)
export default router
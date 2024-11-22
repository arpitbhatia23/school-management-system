import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middelware.js";
import { getStudent } from "../controllers/admin.controller.js";
const router =Router()
router.route('/getstudent').get(verifyJwt,getStudent)
export default router


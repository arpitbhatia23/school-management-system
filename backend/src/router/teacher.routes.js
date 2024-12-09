import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middelware.js";
import { addAssignment, getallAssignment } from "../controllers/teacher.controller.js";

const router=Router();
router.route('/addAssignment').post(verifyJwt,addAssignment)
router.route("/getallAssignment").get(verifyJwt,getallAssignment)

export default router

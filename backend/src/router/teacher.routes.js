import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middelware";
import { addAssignment, getallAssignment } from "../controllers/teacher.controller";

const router=Router();
router.route('/addAssignment').post(verifyJwt,addAssignment)
router.route("/getallAssignment").get(verifyJwt,getallAssignment)

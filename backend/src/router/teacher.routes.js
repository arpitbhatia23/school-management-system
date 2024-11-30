import { Router } from "express";
// import { verifyJwt } from "../middleware/auth.middelware";
import { addAssignment, getallAssignment } from "../controllers/teacher.controller.js";
import {verifyJwt } from "../middleware/auth.middelware.js";

const router=Router()
router.route('/addAssignment').post(verifyJwt,addAssignment)
router.route('/getAllAssignment').get(verifyJwt,getallAssignment)
export default router
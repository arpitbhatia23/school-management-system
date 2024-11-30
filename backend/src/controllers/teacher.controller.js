import { Assignment } from "../models/assignment";
import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

S

const getallAssignment=asyncHandler(async(req,res)=>{
    const teacher_id=req.user._id
    const teacher = await User.findById(teacher_id)
if(!teacher){
    throw new apiError(404,"guru ji ni mile 😒")
}
const class_incharge=teacher.profile.class_incharge
const assignments=await Assignment.find({class_incharge:class_incharge})
if(!assignments){
    throw new apiError(404,"assignments ni mile 😒")
}

return res.status(200).json(new apiResponse(200,assignments,"assignments mili gye"))


})



export {getallAssignment}
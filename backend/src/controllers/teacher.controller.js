
import { Assignment } from "../models/assignment";
import { User } from "../models/user.model";
import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";



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





const addAssignment = asyncHandler(async(req,res)=>{
    const {title,class_name,due_date}=req.body
    if(!(title,class_name,due_date,subject)){
        throw new apiError(400,"Please fill all fields")
    }
    const assignment = await Assignment.create({
        title,
        class_name,
        due_date,
        subject
})

if(!(assignment)){
    throw new apiError(400,'something went wrong')
}
return res.status(200).json(new apiResponse(200,"added successfully"))
})

export {addAssignment,getallAssignment}







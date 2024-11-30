import { Assignment } from "../models/assignment";
import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

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

export {addAssignment}






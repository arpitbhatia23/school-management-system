
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { apiResponse } from "../utils/apiResponse.js"
import { apiError } from "../utils/apiError.js"
import { Fees } from "../models/fees.js"

const totalstudentGender=asyncHandler(async(req,res)=>{

    const totalstudent=await User.aggregate([
        {
            $match:{role:"student"},
        },
        {
            $group:{
                _id:"$gender",
                count:{
                    $sum:1
                }
            }

        }
    ])
    if(totalstudent.length==0){
     throw   new apiError(400,"total student not found")
    }

    return res.status(200).json(new apiResponse(200,totalstudent,"total student get successfully"))

})

const totalfee=asyncHandler(async(req,res)=>{
const total=await Fees.aggregate([
    {
        $addFields:{
            convertedDate: {
                $cond: {
                  if: { $eq: [{ $type: "$payment_date" }, "string"] },
                  then: { $dateFromString: { dateString: "$payment_date" } },
                  else: "$payment_date"
                }
              }
        }
    },
    {
        $addFields:{
            month :{$month:"$convertedDate"},
  year:{$year:"$convertedDate"}
        }
    },
    {
        $group:{
            _id: { year: "$year", month: "$month" },
  totalAmount:{
    $sum:{
      $toInt:"$amount"
    }
  }
        }
    },
    {
        $sort:{
            "_id.year":1,
            "_id.month":1
          }
    },
    {
        $limit:10
    }
])

if(total.length==0){
    throw new apiError(400,"total fee not found ")

}
return res.status(200).json(new apiResponse(200,total,"total fee fetch successfully"))

})

export {
    totalstudentGender,
    totalfee
}
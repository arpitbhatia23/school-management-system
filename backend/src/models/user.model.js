
import mongoose, { Schema } from "mongoose";

const userSchema= new mongoose.Schema({
name : {
    type: String,
    required: true},
email :{
    type:String}  ,
phone_no:{
    type:Number,
    required:true
}   ,
password:{
    type:String,
    required:true
},
gender:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:["student","admin","teacher"],
},
profile:{
    type:Schema.Types.Mixed,
    required:true
},
profile_image:{
    type:String,
    required:ture
}


},
{
    timestamps: true
})

userSchema.pre("save", function (next) {
    if (this.role === "student") {
      const { error } = studentProfileSchema.validateSync(this.profile);
      if (error) return next(new Error(`Invalid student profile: ${error.message}`));
    } else if (this.role === "teacher") {
      const { error } = teacherProfileSchema.validateSync(this.profile);
      if (error) return next(new Error(`Invalid teacher profile: ${error.message}`));
    }
    next();
  });
  


export const User = mongoose.model("User",userSchema)

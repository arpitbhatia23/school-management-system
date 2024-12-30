import { api } from "@/utils/api"
import { data } from "autoprefixer"
import { object } from "zod"
export const useAuthApi=()=>{


const login=async(data)=>{try {
   
      return  await api.post("/users/login",data)
      
} catch (error) {
return error.response
}

}

const register=async(data)=>{
  
    try {
        return await api.post("/users/register",data,{
            
          headers: {
            "Accept":"multipart/form-data"
          },
        })
    } catch (error) {
        return error.response
    }
}
// update image
const updateImage = async(data)=>{
  try {
    return await api.patch("users/update_image",data,{
      headers:{
        "Accept":"multipart/form-data"
      },
    })
}catch(error){
  return error.response
}}
// current user
const currentUser = async(data)=>{
  try{
    return await api.get("users/current_user",data,{
      headers:{
        "Accept":"application/json"
      },
    })
  }
  catch(error){
    return error.response
  }}
  // change password
  const changePassword = async(data)=>{
    try{
      return await api.patch("user/change_password",data,{
        headers:{
          "Accept":"application/json"
        },
      })
    }catch(error){
      return error.response
    }
  }
  // update profile detail
const update_profile_detail = async(data)=>{
  try{
    return await api.patch("user/updateprofile",data,{
      headers:{
        "Accept":"application/json"
      },
    }) 
  }catch(error){
    return error.response
  }
}
// 


return{login,register,updateImage,currentUser,changePassword}
}

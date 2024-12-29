import { api } from "@/utils/api"
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
return{login,register}
}

import { api } from "@/utils/api"
export const studentapi=()=>{
    // gen id card
    const idCard =async(data)=>{
        try{
            return await api.get('student/genidcard',data)
        }catch(error){
            return error.response
        }
    }
    // get monthly attendance
    const getMonthlyAttendance =async(data)=>{
        try{
return await api.get('student/getMonthlyAttendance',data)
        }catch(error)
    {return error.response}
}
//getexam
const getExam =async(data)=>{
    try{
        return await api.get('student/getexam',data)
    }catch(error){
        return error.response
    }
}
// get result
const result =async(data)=>{
    try{
        return await api.get('student/getResult',data)
    }catch(error){
        return error.response
    }
}
// get syllabus
const syllabus =async(data)=>{
    try{
        return await api.get('student/getSyllabus',data)
    }catch(error)
    {return error.response}
}
// get notifivcation
const notification = async(data)=>{
    try{
        return await api.get('student/getnotification',data)
    }catch(error){
        return error.response
    }
}
    return{idCard,getMonthlyAttendance,getExam,result,syllabus,notification}
}
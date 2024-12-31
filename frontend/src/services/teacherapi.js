import { api } from "@/utils/api"
import { data } from "autoprefixer"

export const teacherapi=()=>{
// add assingnment
const addAssignment =async(data)=>{
    try{
        return await api.post('teacher/addAssignment',data)
    }catch(error){
        return error.response
    }
}
// get assignment
const getAssignment = async(data)=>{
    try{
        return await api.get('teacher/getAllAssignment',data)
    }catch(error){
        return error.response
    }
}
// add exam
const exam =async(data)=>{
    try{
        return await api.post('teacher/addExam',data)
    }catch(error){
        return error.response
    }
}
// add attendance
const attendance = async(data)=>{
try{
    return await api.post('teacher/addAttendance',data)
}catch(error){
    return error.response
}
}
// add result
const result = async(data)=>{
    try{ 
        return await api.post('teacher/addResult',data)
    }catch(error){
        return error.response
    }
}
// get students
const getStudent = async(data)=>{
    try{
        return await api.get('teacher/getStudent',data)
    }catch(error){
        return error.response
    }
}
// add syllabus
const syllabus=async(data)=>{
    try{
        return await api.post('teacher/addSyllabus',data)
    }catch(error){
        return error.response
    }
}
// get notification
const notification=async(data)=>{
    try{
        return await api.get('',data)
    }catch(error){
        return error.response
    }
}
// gen id card
const idCard=async(data)=>{
    try{
        return await api.get('teacher/genidcard',data)
    }catch(error){
        return error.response
    }
}
return {addAssignment,getAssignment,exam,attendance,result,getStudent,syllabus,notification,idCard}
}
import { api } from '@/utils/api';
export const adminApi = () => {
  const students = async (data) => {
    try {
      return await api.get('admin/getStudent', data);
    } catch (error) {
      return error.response;
    }
  };
  // get student by id
  const studentsById = async (data) => {
    try {
      return await api.get(`admin/getstudentbyid/:${data}`);
    } catch (error) {
      return error.response;
    }
  };
  // promote student
  const promoteStudent = async (data) => {
    try {
      return await api.post('admin/promoteStudent', data);
    } catch (error) {
      return error.response;
    }
  };
  // get parents
  const getParents = async (data) => {
    try {
      return await api.get('admin/getallparents', data);
    } catch (error) {
      return error.response;
    }
  };
  // get teachers
  const getTeachers = async (data) => {
    try {
      return await api.get('admin/getTeacher', data);
    } catch (error) {
      return error.response;
    }
  };
  // get TeacherById
  const getTeacherById = async (data) => {
    try {
      return await api.get('admin/getTeacherById', data);
    } catch (error) {
      return error.response;
    }
  };
  // get parentsById
  const getParentsById = async (data) => {
    try {
      return await api.get('admin/getParentsById', data);
    } catch (error) {
      return error.response;
    }
  };
  // add subject
  const addSubject = async (data) => {
    try {
      return await api.post('admin/addSubject', data);
    } catch (error) {
      return error.response;
    }
  };
  // get subject
  const getSubject = async (data) => {
    try {
      return await api.get('admin/getallsubject', data);
    } catch (error) {
      return error.response;
    }
  };
  // add expense
  const addExpense = async (data) => {
    try {
      return await api.post('admin/addNewExpense', data);
    } catch (error) {
      return error.response;
    }
  };

  // get notification
  const getnotification = async () => {
    try {
      return await api.get('admin/getnotification');
    } catch (error) {
      return error.response;
    }
  };
  return {
    students,
    studentsById,
    promoteStudent,
    getParents,
    getTeachers,
    getTeacherById,
    getParentsById,
    addSubject,
    getSubject,
    getnotification,
  };
};

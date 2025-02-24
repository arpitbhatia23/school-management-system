import { api } from '@/utils/api';

export const adminApi = () => {
  const students = async (data) => {
    console.log(data);
    try {
      return await api.post('admin/getStudent', data);
    } catch (error) {
      return error.response;
    }
  };
  // get student by id
  const studentsById = async (student_id) => {
    console.log(student_id);
    try {
      return await api.post(`admin/getstudentbyid/${student_id}`);
    } catch (error) {
      return error.response;
    }
  };

  // delete student by id
  const deleteuser = async (data) => {
    try {
      return await api.post('admin/deletestudentbyid', data);
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
      return await api.post('admin/getallparents', data);
    } catch (error) {
      return error.response;
    }
  };
  // get teachers
  const getTeachers = async (data) => {
    try {
      return await api.post('admin/getTeacher', data);
    } catch (error) {
      return error.response;
    }
  };
  const getallteacher = async () => {
    try {
      return await api.get('admin/getteacher');
    } catch (error) {
      return error.response;
    }
  };
  // get TeacherById
  const getTeacherById = async (data) => {
    try {
      return await api.post('admin/getTeacherById', data);
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
      return await api.post('admin/getallsubject', data);
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
  // get Expenses
  const getExpenses = async (data) => {
    try {
      return await api.post('admin/getAllExpense', data);
    } catch (error) {
      return error.response;
    }
  };
  // update parents by Id
  const updateParentsById = async (data) => {
    try {
      return await api.patch('admin/updateParentsById', data);
    } catch (error) {
      return error.response;
    }
  };
  // update subject
  const updateSubject = async (data) => {
    try {
      return await api.patch('admin/updatesubject', data);
    } catch (error) {
      return error.response;
    }
  };
  // add notification
  const addnotification = async (data) => {
    try {
      return await api.post('admin/addnotification', data);
    } catch (error) {
      return error.response;
    }
  };
  // get notification
  const getNotification = async () => {
    try {
      return await api.get('admin/getnotification');
    } catch (error) {
      return error.response;
    }
  };
  // del notification
  const delNoification = async (data) => {
    console.log(data);
    try {
      return await api.delete(`admin/deleteNotification/${data}`);
    } catch (error) {
      return error.response;
    }
  };
  // add fees
  const fees = async (data) => {
    try {
      return await api.post('admin/addfees', data);
    } catch (error) {
      return error.response;
    }
  };
  // get fees
  const getFees = async (data) => {
    try {
      return await api.post('admin/getfees', data);
    } catch (error) {
      return error.response;
    }
  };

  const totalstudent = async () => {
    try {
      return await api.get('admin/totalstudent');
    } catch (error) {
      return error.response;
    }
  };

  const totalfees = async () => {
    try {
      return await api.get('admin/totalfees');
    } catch (error) {
      return error.response;
    }
  };

  const totalexpense = async () => {
    try {
      return await api.get('admin/totalexpense');
    } catch (error) {
      return error.response;
    }
  };

  const totalteacher = async () => {
    try {
      return await api.get('admin/totalteacher');
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
    addExpense,
    getExpenses,
    addnotification,
    updateSubject,
    updateParentsById,
    getNotification,
    delNoification,
    fees,
    getFees,
    totalstudent,
    totalfees,
    totalexpense,
    totalteacher,
    deleteuser,
    getallteacher,
  };
};

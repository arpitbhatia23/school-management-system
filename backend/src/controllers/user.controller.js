import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';
import { parents_Detail } from '../models/parentsschema.js';
import { apiResponse } from '../utils/apiResponse.js';
import router from '../router/user.routes.js';
import { Student } from '../models/studentprofile.js';

const generateStudentRollNo = async (className) => {
  // Count the number of students in the specified class
  const studentCount = await User.countDocuments({
    role: 'student',
    'profile.className': className,
  });

  console.log(studentCount);
  const rollNo = `${studentCount + 1}`.padStart(3, '0'); // Ensure 3 digits
  return rollNo;
};

const register = asyncHandler(async (req, res) => {
  // Destructure main user details from request body
  const { name, gender, email, password, role, profile, phone_no } = req.body;

  // Validate required fields
  if ([name, gender, role].some((field) => field?.trim() === '')) {
    throw new apiError(400, 'All user fields are required');
  }

  // Handle student-specific logic
  if (role === 'student') {
    // Ensure `parents` details exist in profile
    const parents = profile?.parents_Detail;
    if (!parents) {
      throw new apiError(400, 'Parent details are required for students');
    }

    // Destructure and validate `parents` details
    const { father_name, mother_name, father_occupation, phone, email } =
      parents;

    if (
      [father_name, mother_name, father_occupation, phone, email].some(
        (field) => field?.trim() === '',
      )
    ) {
      throw new apiError(400, 'All parent fields are required');
    }
    // Destructure and validate additional profile details
    const {
      className,
      DOB,
      religion,
      blood_group,
      nationality,
      address,
      category,
      admission_Date,
    } = profile;
    if (
      [
        className,
        DOB,
        religion,
        blood_group,
        nationality,
        address,
        category,
        admission_Date,
      ].some((field) => field?.trim() === '')
    ) {
      throw new apiError(400, 'All profile fields are required');
    }

    // Register parents' details
    const parentsDetailRecord = await parents_Detail.create({
      father_name,
      mother_name,
      father_occupation,
      phone,
      email,
    });

    if (!parentsDetailRecord) {
      throw new apiError(500, 'Error registering parent details');
    }

    // Generate roll number and use DOB as password
    const roll_no = await generateStudentRollNo(className);
    console.log(roll_no);
    const student_password = DOB;

    // Create user record with profile data
    const user = await User.create({
      name,
      gender,
      email,
      password: student_password,
      role,
      profile: { ...profile, parents_Detail: parentsDetailRecord._id, roll_no },

      phone_no,
    });

    if (!user) {
      throw new apiError(500, 'Error registering user');
    }

    // Return successful registration response
    return res
      .status(201)
      .json(new apiResponse(201, {}, 'User registered successfully'));
  }

  throw new apiError(400, 'Only student registration is supported currently');
});

export { register };

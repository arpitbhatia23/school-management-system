import { Assignment } from '../models/assignment.js';
import { User } from '../models/user.model.js';
import { apiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { apiResponse } from '../utils/apiResponse.js';
import { Exam } from '../models/exam.js';
import { Attendance } from '../models/attendance.js';
import { isValidObjectId } from 'mongoose';
import { Result } from '../models/result.js';
import path from 'path';
import https from 'https';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import { drawRoundImage } from '../utils/pdf.js';
import { qrcodegen } from '../utils/qr.js';
import { Syllabus } from '../models/syllabus.js';
import { Notification } from '../models/notification.js';
const getallAssignment = asyncHandler(async (req, res) => {
    const teacher_id = req.user._id;
    const teacher = await User.findById(teacher_id);
    if (!teacher) {
        throw new apiError(404, 'guru ji ni mile 😒');
    }
    console.log(teacher);
    const class_incharge = teacher.profile.class_incharge;
    console.log(class_incharge);
    const assignments = await Assignment.find({ class_name: class_incharge });
    if (!assignments) {
        throw new apiError(404, 'assignments ni mile 😒');
    }

    return res.status(200).json(new apiResponse(200, assignments, 'assignments mili gye'));
});

const addAssignment = asyncHandler(async (req, res) => {
    const { title, class_name, due_date, subject } = req.body;
    if (!(title, class_name, due_date, subject)) {
        throw new apiError(400, 'Please fill all fields');
    }
    const assignment = await Assignment.create({
        title,
        class_name,
        due_date,
        subject,
    });

    if (!assignment) {
        throw new apiError(400, 'something went wrong');
    }
    return res.status(200).json(new apiResponse(200, assignment, 'added successfully'));
});

// add exam
const addExam = asyncHandler(async (req, res) => {
    const { exam_title, exam_discription, exam_date, class_name } = req.body;
    const fileurl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;
    if (!(exam_title, exam_discription, exam_date, class_name, fileurl)) {
        throw new apiError(400, 'all fields are required');
    }
    const exam = await Exam.create({
        exam_title,
        exam_discription,
        exam_date,
        class_name,
        file: fileurl,
    });
    if (!exam) {
        throw new apiError(400, 'something went wrong');
    }
    return res.status(200).json(new apiResponse(200, exam, 'added successfully'));
});
// add attendance
const addAttendance = asyncHandler(async (req, res) => {
    const { attendance } = req.body; // Accept an array of attendance objects

    if (!Array.isArray(attendance) || attendance.length === 0) {
        throw new apiError(400, 'Attendance must be a non-empty array');
    }

    // Validate each attendance object
    for (const att of attendance) {
        const { date, student_status, student_id, student_class} = att;
        if (!student_id || !isValidObjectId(student_id)) {
            throw new apiError(400, `Invalid or missing student ID: ${student_id}`);
        }
        if (!date || !student_status ||!student_class) {
            throw new apiError(
                400,
                `Missing required fields (date or status or class) for student ID: ${student_id}`
            );
        }
    }

    try {
        // Insert attendances in bulk
        const insertedAttendances = await Attendance.insertMany(
            attendance.map(({ date, student_status, student_id,student_class }) => ({
                date: new Date(date),
                status: student_status,
                student_id,
                className:student_class
            }))
        );

        if ( insertedAttendances.length === 0) {
            throw new apiError(500, 'Failed to insert attendance records');
        }

        
        return res.status(200).json(
            new apiResponse(200, insertedAttendances, 'Attendances successfully added')
        );
    } catch (error) {
        console.error('Error while adding attendance:', error.message);
        throw new apiError(500, 'An unexpected error occurred while adding attendance');
    }
});


// add result
const addResult = asyncHandler(async (req, res) => {
    const { student_id, name, examtype } = req.body;

    const pdfurl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;
    if (!(student_id, name, examtype, pdfurl)) {
        throw new apiError(400, 'all field are required');
    }
    const result = await Result.create({
        student_id,
        name,
        examtype,
        pdf: pdfurl,
    });
    if (!result) {
        throw new apiError(400, 'kuch toh gadbad hai daya 🧐🧐');
    }
    return res.status(200).json(new apiResponse(200, result, ' tusa re karname hoyi gye upload'));
});

const getStudents = asyncHandler(async (req, res) => {
    const _id = req.user._id;
    const teacher = await User.findById(_id);
    if (!teacher) {
        throw new apiError(400, 'teacher not found');
    }
    const students = await User.aggregate([
        { $match: { 'profile.className': teacher?.profile?.class_incharge } },
        {
            $project: {
                name: 1,
                className: '$profile.className',
                roll_no: '$profile.roll_no',
                phone_no: 1,
            },
        },
    ]);

    console.log(teacher.profile?.class_incharge);
    if (students.length == 0) {
        throw new apiError(400, 'student not found');
    }
    return res.status(200).json(new apiResponse(200, students, 'students found'));
});

const genIdCard = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Fetch student data
    const teacher = await User.findById(userId).select(
        '-password -profile.attendence -profile_image.public_id -profile.admission_Date -refreshToken -createdAt -updatedAt -profile_image._id',
    );
    if (!teacher) {
        throw new apiError(400, 'teacher not found');
    }

    const imageDir = './public/images';
    const idCardDir = './public/idCards';
    const jpegPath = path.join(imageDir, `${teacher._id}_profile_image.jpg`);
    const pdfPath = path.join(idCardDir, `${teacher._id}_idCard.pdf`);
    const qrpath = path.join(imageDir, `${teacher._id}_QrCode.png`);

    // Ensure directories exist
    for (const dir of [imageDir, idCardDir]) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    // Function to download an image
    const downloadImage = (url, dest) => {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(dest);
            https
                .get(url, (response) => {
                    if (response.statusCode !== 200) {
                        return reject(
                            new Error(`Failed to download image: ${response.statusCode}`),
                        );
                    }
                    response.pipe(file);
                })
                .on('error', reject);

            file.on('finish', () => {
                file.close();
                resolve(); // Ensure stream is closed
            }).on('error', reject);
        });
    };

    try {
        // Download and process the image
        await downloadImage(teacher.profile_image.url, jpegPath);
        await qrcodegen(teacher, qrpath);

        console.log(jpegPath);

        // Create the PDF document
        const doc = new PDFDocument({ size: 'A6', margin: 20, font: 'Times-Roman' });
        doc.pipe(fs.createWriteStream(pdfPath));
        const margin = 10;
        const gradientone = doc.linearGradient(10, 10, 300, 300); // Diagonal direction (top-left to bottom-right)
        gradientone.stop(0, '#9b59b6'); // Purple
        gradientone.stop(1, 'red');

        doc.rect(margin, margin, 300 - 2 * margin, 420 - 2 * margin).fill(gradientone);
        // Add school logo and name
        doc.image('./public/files/image.png', 20, 40, { width: 50, height: 50, align: 'center' });
        doc.fontSize(14)
            .fillColor('white')
            .text('TAMANNA PUBLIC SCHOOL', 70, 60, { align: 'center', width: 200 });

        const imageDiameter = 100; // Set diameter for round image
        drawRoundImage(doc, jpegPath, 95, 100, imageDiameter);
        // Add student details
        doc.fontSize(14)
            .fillColor('white')
            .text(`NAME : ${String(teacher.name).toUpperCase()}`, 0, 230, {
                width: doc.page.width,
                align: 'center',
            })
            .text(`CLASS_INCHARGE : ${String(teacher.profile.class_incharge).toUpperCase()}`, {
                width: doc.page.width,
                align: 'center',
            })
            .text(`DOB : ${String(teacher.profile.DOB).toUpperCase()}`, {
                width: doc.page.width,
                align: 'center',
            })
            .text(`PHONE_NO : ${String(teacher.phone_no).toUpperCase()}`, {
                width: doc.page.width,
                align: 'center',
            })
            .text(
                `QUALIFICATION : ${String(teacher.profile.qualification.toUpperCase()).toUpperCase()}`,
                { width: doc.page.width, align: 'center' },
            );

        // Add signature area
        doc.fillColor('red').image('./public/images/image.png', 210, 320, {
            height: 50,
            width: 50,
        });
        doc.fontSize(10)
            .fillColor('white')
            .text('tamanna karthol', 180, 350, { align: 'center' })
            .text('Principal', 180, 360, { align: 'center' });

        // Footer section
        doc.fontSize(8)
            .fillColor('white')
            .text(`NATIONALITY : ${teacher.profile.nationality}`, 20, 375, { align: 'left' })
            .text(`ID: ${teacher._id}`, 20, 375, { align: 'right' });

        doc.addPage();
        const gradient = doc.linearGradient(10, 10, 300, 300); // Diagonal direction (top-left to bottom-right)
        gradient.stop(0, '#9b59b6'); // Purple
        gradient.stop(1, 'red');

        doc.lineWidth(2) // Set the line width for the stroke
            .rect(10, 10, 300 - 20, 400) // Rectangle position and size
            .strokeColor('black') // Set stroke color to black
            .fillColor(gradient) // Fill the rectangle with purple
            .fill() // Apply fill to the rectangle
            .stroke();

        // Add text inside the rectangle
        doc.fillColor('white')
            .fontSize(12) // Set text color to white
            .text('Terms and Conditions', 10, 30, {
                align: 'center',
                width: 300 - 20, // Ensure the text width fits inside the rectangle
            });
        doc.fontSize(12)
            .fillColor('white')
            .text('1. The ID card is the property of the school.', 30, 50)
            .text('2. It should be presented on request by authorized personnel.')
            .text('3. The card should not be tampered with or altered in any way.')
            .text('4. The student must carry this card at all times within school premises.')
            .text('5. Loss of the ID card should be reported immediately.')
            .text('6. In case of any change in the student details, the card should be updated.')
            .text('7. Unauthorized use of the ID card may lead to disciplinary action.');

        doc.image(qrpath, 100, 240, { width: 90, height: 90, align: 'center' });

        doc.text('Inspiring Minds, Building Character', 0, 360, {
            align: 'center',
            width: 300,
        }).text('TAMANNA PUBLIC SCHOOL', { align: 'center', width: 300 });
        // End the document

        doc.end();

        console.log(`ID Card saved at ${pdfPath}`);
        fs.unlinkSync(jpegPath);
        fs.unlinkSync(qrpath);

        const pdfurl = `${req.protocol}://${req.get('host')}/idcards/${teacher._id}_idCard.pdf`;
        return res.status(200).json(new apiResponse(200, pdfurl, 'id generate successfully'));
    } catch (error) {
        console.error('Error generating ID card:', error);
        if (fs.existsSync(jpegPath)) await fs.promises.unlink(jpegPath).catch(() => {});
        throw new apiError(500, 'Failed to generate ID card');
    }
});
// add syllabus
const addSyllabus = asyncHandler(async (req, res) => {
    const { title, subject, className } = req.body;
    const fileurl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;
    if (!(title, subject, className, fileurl)) {
        throw new apiError(400, 'all fields are required');
    }

    const syllabus = await Syllabus.create({
        title,
        subject,
        className,
        file: fileurl,
    });
    if (!syllabus) {
        throw new apiError(400, 'something went wrong');
    }
    return res.status(200).json(new apiResponse(200, syllabus, 'syllabus added successfully'));
});
//get notification
const getNotification = asyncHandler(async (req, res) => {
    const { _id } = req.user._id;
    const teacher = await User.findById(_id);
    if (!teacher) {
        throw new apiError(400, 'teacher not found');
    }
    const notification = await Notification.find({});
    if (!notification) {
        throw new apiError(400, 'something went wrong');
    }
    return res.status(200).json(new apiResponse(200, 'notification '));
});

export {
    addAssignment,
    getallAssignment,
    addExam,
    addResult,
    addAttendance,
    getStudents,
    genIdCard,
    addSyllabus,
    getNotification,
};

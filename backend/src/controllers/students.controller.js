import { asyncHandler } from '../utils/asyncHandler.js';
import PDFDocument from 'pdfkit';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { User } from '../models/user.model.js';
import { apiError } from '../utils/apiError.js';

import { apiResponse } from '../utils/apiResponse.js';
import { drawRoundImage } from '../utils/pdf.js';
import { qrcodegen } from '../utils/qr.js';
import { Student } from '../models/studentprofile.js';

import { Exam } from '../models/exam.js';
import { Result } from '../models/result.js';
import { Syllabus } from '../models/syllabus.js';
import { Notification } from '../models/notification.js';

const genIdCard = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Fetch student data
    const student = await User.findById(userId);
    if (!student) {
        throw new apiError(400, 'Student not found');
    }

    const imageDir = './public/images';
    const idCardDir = './public/idCards';
    const jpegPath = path.join(imageDir, `${student._id}_profile_image.jpg`);
    const pdfPath = path.join(idCardDir, `${student._id}_idCard.pdf`);
    const qrpath = path.join(imageDir, `${student._id}_QrCode.png`);
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
    const qrdata = {
        _id: student._id,
        name: student.name,
        phone_no: student.phone_no,
        email: student.email,
        address: student.profile.address,
        profile_image: student.profile_image.url,
        dob: student.profile.DOB,
        blood_group: student.profile.blood_group,
        religion: student.profile.religion,
        nationality: student.profile.nationality,
        className: student.profile.className,
        catageroy: student.profile.catageroy,
    };

    try {
        // Download and process the image
        await downloadImage(student.profile_image.url, jpegPath);
        await qrcodegen(qrdata, qrpath);

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
            .fillColor('#ffffff')
            .text('TAMANNA PUBLIC SCHOOL', 70, 60, { align: 'center', width: 200 });

        const imageDiameter = 100; // Set diameter for round image
        drawRoundImage(doc, jpegPath, 95, 100, imageDiameter);

        // doc.image(jpegPath, 85, 100, { width: 120, height: 100,  align:"center"});

        // Add student details
        doc.fontSize(14)
            .fillColor('#ffffff')
            .text(`NAME : ${String(student.name).toUpperCase()}`, 0, 230, {
                width: doc.page.width,
                align: 'center',
            })
            .text(`CLASS : ${String(student.profile.className).toUpperCase()}`, {
                width: doc.page.width,
                align: 'center',
            })
            .text(`ROLL_NO : ${String(student.profile.roll_no).toUpperCase()}`, {
                width: doc.page.width,
                align: 'center',
            })
            .text(`PHONE_NO : ${String(student.phone_no).toUpperCase()}`, {
                width: doc.page.width,
                align: 'center',
            })
            .text(`DOB : ${String(student.profile.DOB).toUpperCase()}`, {
                width: doc.page.width,
                align: 'center',
            });

        // Add signature area
        doc.fontSize(10)
            .font('Times-Roman')
            .fillColor('#ffffff')
            .image('./public/images/image.png', 210, 320, { height: 50, width: 50 });
        doc.font('Times-Roman')
            .fontSize(10)
            .fillColor('#ffffff')
            .text('tamanna karthol', 180, 350, { align: 'center' })
            .text('Principal', 180, 360, { align: 'center' });

        // Footer section
        doc.fontSize(10)
            .fillColor('#ffffff')
            .text(
                `SY ${new Date(student.createdAt).getFullYear()}-${new Date(student.createdAt).getFullYear() + 1}`,
                20,
                375,
                { align: 'left' },
            )
            .text(`ID: ${student._id}`, 20, 375, { align: 'right' });

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

        fs.unlinkSync(jpegPath);
        fs.unlinkSync(qrpath);
        const pdfurl = `${req.protocol}://${req.get('host')}/idcards/${student._id}_idCard.pdf`;
        return res.status(200).json(new apiResponse(200, pdfurl, 'id generate successfully'));
    } catch (error) {
        console.error('Error generating ID card:', error);
        if (fs.existsSync(jpegPath)) await fs.promises.unlink(jpegPath).catch(() => {});
        throw new apiError(500, 'Failed to generate ID card');
    }
});

// attendance
const getMonthlyAttendance = asyncHandler(async (req, res) => {
    const _id = req.user._id;
    const { startDate, endDate } = req.body;
    if (!(startDate, endDate)) {
        throw new apiError(400, 'enter Date');
    }
    const result = await User.aggregate([
        {
            $match: { _id }, // Match student by ID
        },
        {
            $lookup: {
                from: 'attendances', // Collection name for Attendance schema
                localField: 'profile.attendance', // Field in Student schema
                foreignField: '_id', // Field in Attendance schema
                as: 'attendanceRecords', // Alias for joined data
            },
        },
        {
            $unwind: '$attendanceRecords', // Flatten attendance array
        },
        {
            $match: {
                'attendanceRecords.date': {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                }, // Filter by date
            },
        },
        {
            $group: {
                _id: '$attendanceRecords.status',
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
    // Format the result
    const attendanceSummary = {
        present: 0,
        absent: 0,
        leave: 0,
    };

    result.forEach((record) => {
        attendanceSummary[record._id] = record.count;
    });

    return res
        .status(200)
        .json(new apiResponse(200, attendanceSummary, 'attendance fetch successfully'));
});

// get result by id
const getResult = asyncHandler(async (req, res) => {
    const _id = req.user._id;

    const result = await Result.find({ student_id: _id });
    console.log(result);
    if (result.length == 0) {
        throw new apiError(400, 'result not found');
    }
    console.log(result);
    return res.status(200).json(new apiResponse(200, result, 'result found successfully'));
});

const getexam = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const student = await User.findById(_id);

    if (!student) {
        throw new apiError(404, 'student not found');
    }
    const exam = await Exam.aggregate([
        {
            $match: {
                class_name: student.profile.className,
            },
        },
    ]);

    if (exam.length == 0) {
        throw new apiError(404, 'exan not found ');
    }
    return res.status(200).json(new apiResponse(200, exam, 'exam found sucessfully'));
});
// get syllabus
const getSyllabus = asyncHandler(async (req, res) => {
    const { _id } = req.user._id;
    const student = await User.findById(_id);
    if (!student) {
        throw new apiError(404, 'student not found');
    }
    const syllabus = await Syllabus.find({ className: student.profile.className });
    if (!syllabus) {
        throw new apiError(400, 'something went wrong');
    }
    return res.status(200).json(new apiResponse(200, syllabus, 'syllabus found'));
});
// get notificati   on
const getnotification = asyncHandler(async (req, res) => {
    const { _id } = req.user._id;
    const student = await User.findById(_id);
    if (!student) {
        throw new apiError(404, 'student not found');
    }
    const notification = await Notification.find({});
    if (!notification) {
        throw new apiError(400, 'something went wrong');
    }
    return res.status(200).json(new apiResponse(200, notification, 'notification found'));
});

export { genIdCard, getMonthlyAttendance, getResult, getexam, getSyllabus, getnotification };

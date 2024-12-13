import { asyncHandler } from "../utils/asyncHandler.js";
import PDFDocument from "pdfkit";
import https from "https";
import fs from "fs";
import path from "path";
import sharp from "sharp"; // For image conversion
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse} from  '../utils/apiResponse.js';
import { mongoose } from "mongoose";

const genIdCard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch student data
  const student = await User.findById(userId);
  if (!student) {
    throw new apiError(400, "Student not found");
  }

  const imageDir = "./public/images";
  const idCardDir = "./public/idCards";
  const webpPath = path.join(imageDir, `${student._id}_profile_image.webp`);
  const jpegPath = path.join(imageDir, `${student._id}_profile_image.jpg`);
  const pdfPath = path.join(idCardDir, `${student._id}_idCard.pdf`);

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
            return reject(new Error(`Failed to download image: ${response.statusCode}`));
          }
          response.pipe(file).on("finish", resolve).on("error", reject);
        })
        .on("error", reject);
    });
  };

  try {
    // Download and process the image
    await downloadImage(student.profile_image.url, webpPath);
    await sharp(webpPath).toFormat("jpeg").toFile(jpegPath);

    await sharp(webpPath).toBuffer(); // Ensures file processing is fully done
    // Add a small delay to ensure file lock is released
    setTimeout(async () => {
      try {
        await fs.promises.unlink(path.basename(webpPath));
      } catch (err) {
        console.warn(`Failed to delete WebP file: ${err.message}`);
      }
    }, 100);     // Create the PDF document
    const doc = new PDFDocument({ size: "A6", margin: 20 });
    doc.pipe(fs.createWriteStream(pdfPath));
    const margin = 10; 

    doc.rect(margin, margin, 300 - 2 * margin, 420 - 2 * margin).stroke("#000").fillColor("#000000").fill()
    // Add school logo and name
    doc.image("./public/files/image.png", 40, 30, { width: 40, height: 40 });
    doc
      .fontSize(14)
      .fillColor("#000080")
      .text("HOLY BLUE ANGELS PREPARATORY SCHOOL", 80, 40, { align: "left", width: 200 });


    doc.image(jpegPath, 85, 80, { width: 120, height: 100,  align:"center"});

    // Add student details
    doc
      .fontSize(14)
      .fillColor("#000080")
      .text(`Name : ${student.name}`, 70, 190)
      .text(`class : ${student.profile.className}`)
      .text(`roll_no : ${student.profile.roll_no}`)
      .text(`Phone_no : ${student.phone_no}`).text(`DOB : ${student.profile.DOB}`)


    // Add signature area
    doc
      .fontSize(10).font("Helvetica")
      .fillColor("red")
      .image("./public/images/image.png", 210,320,{height:50,width:50});
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor("gray")
      .text("tamanna karthol", 180, 350, { align: "center" })
      .text("Principal", 180, 360, { align: "center" });

    // Footer section
    doc
      .fontSize(10)
      .fillColor("#FF4500")
      .text(`SY ${ new Date(student.createdAt).getFullYear() }-${new Date(student.createdAt).getFullYear()+1}`, 20, 375, { align: "left" })
      .text(`ID: ${student._id}`,20, 375, { align: "right" });

    doc.end();

    console.log(`ID Card saved at ${pdfPath}`);
    fs.unlinkSync(jpegPath)

   return res.status(200).json({
      success: true,
      message: "ID card generated successfully",
      path: pdfPath,
    });

  } catch (error) {
    console.error("Error generating ID card:", error);
  if (fs.existsSync(webpPath)) await fs.promises.unlink(webpPath).catch(() => {});
  if (fs.existsSync(jpegPath)) await fs.promises.unlink(jpegPath).catch(() => {});
    throw new apiError(500, "Failed to generate ID card");
  }
});

// attendance
const getMonthlyAttendance= asyncHandler(async(req,res)=>{
  const  _id = req.user._id
const result = await User.aggregate([
  {
    $match: { _id }, // Match student by ID
  },
  {
    $lookup: {
      from: 'attendances', // Collection name for Attendance schema
      localField: 'attendance', // Field in Student schema
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
        $gte: '1/12/2024',
        $lte:'31/12/2024',
      }, // Filter by date
    },
  },
  {
    $group: {
      _id: '$attendanceRecords.status', // Group by status
      count: { $sum: 1 }, // Count occurrences
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

return res.status(200).json(new  apiResponse(200, attendanceSummary,"attendance fetch successfully"));
}) 


export { genIdCard , getMonthlyAttendance};

import { asyncHandler } from "../utils/asyncHandler.js";
import PDFDocument from "pdfkit";
import https from "https";
import fs from "fs";
import path from "path";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js"
const genIdCard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch student data
  const student = await User.findById(userId);
  if (!student) {
    throw new apiError(400, "Student not found");
  }

  const imageDir = "./public/images";
  const idCardDir = "./public/idCards";
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
                response.pipe(file);
            })
            .on("error", reject);

        file.on("finish", () => {
            file.close();
             resolve(); // Ensure stream is closed
        }).on("error", reject);
    });
};


  try {
    // Download and process the image
    await downloadImage(student.profile_image.url, jpegPath);
    
console.log(jpegPath)
   
   // Create the PDF document
    const doc = new PDFDocument({ size: "A6", margin: 20 });
    doc.pipe(fs.createWriteStream(pdfPath));
    const margin = 10; 

    doc.rect(margin, margin, 300 - 2 * margin, 420 - 2 * margin).stroke("#000").fill("black")
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
      .text(`CLASS : ${student.profile.className}`)
      .text(`ROLL_NO : ${student.profile.roll_no}`)
      .text(`PHONE_NO : ${student.phone_no}`).text(`DOB : ${student.profile.DOB}`)


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
  const pdfurl=`${req.protocol}://${req.get("host")}/idcards/${student._id}_idCard.pdf`
   return res.status(200).json(new apiResponse(200,pdfurl,"id generate successfully"));

  } catch (error) {
    console.error("Error generating ID card:", error);
  if (fs.existsSync(jpegPath)) await fs.promises.unlink(jpegPath).catch(() => {});
    throw new apiError(500, "Failed to generate ID card");
  }
});

export { genIdCard };

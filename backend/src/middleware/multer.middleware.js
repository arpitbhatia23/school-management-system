import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/temp`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
export const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
});

const filestorgage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/files`);
    },
    filename: function (req, file, cb) {
        console.log("on")
        cb(null, `${Date.now()}${file.originalname}`);
    },
});
export const uploadFile = multer({ storage: filestorgage, limits: { fieldSize: 5 * 1024 * 1024 } });

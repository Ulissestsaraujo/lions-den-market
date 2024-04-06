const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = generateUniqueFileName(file)
        cb(null, uniqueName)
    }
});

const uploadMiddleware = multer({ storage: storage })

function generateUniqueFileName(file) {
    const fileExtension = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${fileExtension}`;
    return uniqueName;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = { uploadMiddleware }
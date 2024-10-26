const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = 'uploads/';
        if (file.mimetype === 'application/pdf') {
            uploadPath += 'pdfs';
        } else if (file.mimetype.startsWith('image')) {
            uploadPath += 'images';
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the file name
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
const multer  = require('multer')
const path = require('path');
const uploadDir = path.join(process.cwd(), '/tmp');

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
    limits: {
      fileSize: 1048576,
    },
  });
  const uploadMiddleware = multer({ storage: storage })


  module.exports = uploadMiddleware
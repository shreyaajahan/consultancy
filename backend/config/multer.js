const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const connectCloudinary = require('./cloudinary');

const cloudinary = connectCloudinary();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'nivas-constructions/projects',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ok = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.mimetype);
    cb(ok ? null : new Error('Only image files are allowed'), ok);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
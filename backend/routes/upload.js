// const express = require('express');
// const { uploadImage, deleteImage } = require('../controllers/uploadController');
// const { protect, admin } = require('../middleware/auth');
// const { upload, handleMulterError } = require('../middleware/upload');

// const router = express.Router();

// router.post('/', protect, admin, upload.single('image'), handleMulterError, uploadImage);
// router.delete('/', protect, admin, deleteImage);

// module.exports = router;


const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadImage } = require('../controllers/uploadController');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, admin, upload.single('image'), uploadImage);

module.exports = router;
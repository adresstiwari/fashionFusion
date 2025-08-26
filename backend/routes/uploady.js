const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const stream = require('stream');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload images to Cloudinary
router.post('/images', upload.array('images', 10), async (req, res) => {
  try {
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'fashion-fusion/products',
            transformation: [
              { width: 800, height: 1000, crop: 'limit' },
              { quality: 'auto' },
              { format: 'webp' }
            ]
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                url: result.secure_url,
                public_id: result.public_id
              });
            }
          }
        );

        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        bufferStream.pipe(uploadStream);
      });
    });

    const uploadedImages = await Promise.all(uploadPromises);
    res.json(uploadedImages);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload images' });
  }
});

// Delete image from Cloudinary
router.delete('/images/:publicId', async (req, res) => {
  try {
    const { publicId } = req.params;
    await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete image' });
  }
});

module.exports = router;
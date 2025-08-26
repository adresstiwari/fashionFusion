const asyncHandler = require('express-async-handler');

const uploadImage = asyncHandler(async (req, res) => {
  if (req.file) {
    res.json({
      url: req.file.path,
      publicId: req.file.filename,
    });
  } else {
    res.status(400).json({ message: 'No image file provided' });
  }
});

module.exports = { uploadImage };


// const cloudinary = require('../config/cloudinary');
// const streamifier = require('streamifier');

// // Upload image to Cloudinary
// const uploadImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder: 'fashion-fusion',
//         transformation: [
//           { width: 800, height: 800, crop: 'limit' },
//           { quality: 'auto' },
//           { format: 'webp' }
//         ]
//       },
//       (error, result) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).json({ message: 'Error uploading image' });
//         }
        
//         res.json({
//           url: result.secure_url,
//           public_id: result.public_id
//         });
//       }
//     );

//     streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Delete image from Cloudinary
// const deleteImage = async (req, res) => {
//   try {
//     const { public_id } = req.body;
    
//     if (!public_id) {
//       return res.status(400).json({ message: 'Public ID is required' });
//     }

//     const result = await cloudinary.uploader.destroy(public_id);
    
//     if (result.result === 'ok') {
//       res.json({ message: 'Image deleted successfully' });
//     } else {
//       res.status(400).json({ message: 'Error deleting image' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   uploadImage,
//   deleteImage
// };
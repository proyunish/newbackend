const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const { createBlogs } = require("../controller/blogController");

const router = express.Router();

// Configure multer-storage-cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "blog-images",  // Cloudinary folder for storing images
//     allowed_formats: ["jpg", "jpeg", "png"],  // Allowed image formats
//   },
// });

// const upload = multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // Set to 5 MB as an example
//   });
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Store locally in `uploads` folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // Generate a unique file name
    },
  });
  
  const upload = multer({ storage: storage });
  
  router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
      console.error("Multer error: No file received");
      return res.status(400).json({ error: "Image upload failed. No file received." });
    }
  
    // Log the file information to ensure multer processed it
    console.log("Uploaded file:", req.file);
  
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
  });
router.route("/create").post(upload.single("image"), createBlogs);
// router.post("/upload-image", upload.single("image"), (req, res) => {
//     try {
//       if (!req.file || !req.file.path) {
//         return res.status(400).json({ error: "Image upload failed. Please try again." });
//       }
//       res.json({ imageUrl: req.file.path });
//     } catch (error) {
//       console.error("Upload error:", error);
//       res.status(500).json({ error: "Server error during image upload" });
//     }
//   });
  
module.exports = router;


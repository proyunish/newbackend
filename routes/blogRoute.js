const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const { createBlogs } = require("../controller/blogController");

const router = express.Router();

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog-images",  // Cloudinary folder for storing images
    allowed_formats: ["jpg", "jpeg", "png"],  // Allowed image formats
  },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Set to 5 MB as an example
  });
router.route("/create").post(upload.single("image"), createBlogs);
router.post("/upload-image", upload.single("image"), (req, res) => {
    try {
      if (!req.file || !req.file.path) {
        return res.status(400).json({ error: "Image upload failed. Please try again." });
      }
      res.json({ imageUrl: req.file.path });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Server error during image upload" });
    }
  });
  
module.exports = router;


const express = require("express");
const multer = require("multer");

const { createBlogs } = require("../controller/blogController");
const { errorHandler } = require("../middleware/errorHandler");

const router = express.Router();


router.route("/create").post(createBlogs);

  
module.exports = router;


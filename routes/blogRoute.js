const express = require("express");
const multer = require("multer");

const { createBlogs, deleteBlogs, getBlogs, getSpecificBlogs } = require("../controller/blogController");
const { errorHandler } = require("../middleware/errorHandler");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = express.Router();


router.route("/create").post(createBlogs);
router.route("/getall").get(getBlogs);
router.route("/:id").delete(isAuthenticated,deleteBlogs);
router.route("/:id").get(errorHandler(getSpecificBlogs));

  
module.exports = router;


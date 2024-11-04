const express = require("express");
const multer = require("multer");

const { createBlogs, deleteBlogs, getBlogs } = require("../controller/blogController");
const { errorHandler } = require("../middleware/errorHandler");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = express.Router();


router.route("/create").post(createBlogs);
router.route("/getall").get(getBlogs);
router.route("/:id").delete(isAuthenticated,deleteBlogs);

  
module.exports = router;


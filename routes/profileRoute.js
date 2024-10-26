const express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { createProfile, editProfile } = require('../controller/profileController');
const { upload } = require('../middleware/multerConfig');
const { errorHandler } = require('../middleware/errorHandler');
const router = express.Router()
router.route("/create").post(isAuthenticated,upload.single('file'),errorHandler(createProfile))
router.route("/edit").patch(isAuthenticated,upload.single('file'),errorHandler(editProfile))


module.exports = router
const express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { upload } = require('../middleware/multerConfig');
const { errorHandler } = require('../middleware/errorHandler');
const { createMeetings, getallMeetings } = require('../controller/meetingController');
const router = express.Router()
router.route("/create").post(isAuthenticated,errorHandler(createMeetings))
router.route("/get").get(isAuthenticated,errorHandler(getallMeetings))


module.exports = router
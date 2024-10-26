const express = require('express');
const { errorHandler } = require('../middleware/errorHandler');
const { createKyc, verifyKyc, getAllKyc, getSingleKyc } = require('../controller/kycController');
const { upload } = require('../middleware/multerConfig');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { allowedTo } = require('../middleware/allowedTO');
const router = express.Router(); 

router.route("/submit/")
    .post(isAuthenticated,upload.fields([
    { name: 'yourPhoto', maxCount: 1 },
    { name: 'documentImage', maxCount: 1 }
    ]),
    errorHandler(createKyc))


router.route("/verify/:kycId")
    .post(isAuthenticated,
    allowedTo('admin'),
    errorHandler(verifyKyc))

router.route("/getAllKyc/") 
.get(isAuthenticated,
    allowedTo('admin'),
    errorHandler(getAllKyc))

    router.route('/getSingleKyc/:id')
    .get(isAuthenticated,
    errorHandler(getSingleKyc))

module.exports = router
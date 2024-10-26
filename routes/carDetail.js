const express = require('express')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { allowedTo } = require('../middleware/allowedTO')
const { createCarDetail, handleOrder } = require('../controller/carDetail')
const router = express.Router()
router.route("/carDetail").post(isAuthenticated,allowedTo('admin'),createCarDetail);
router.route("/save/:id").get(isAuthenticated,handleOrder)
module.exports = router
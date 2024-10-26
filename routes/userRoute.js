const express = require('express');
const { 
     userRegister,
     userLogin, 
     handleLogout, 
     getAllUsers, 
     deleteUser, 
     verifyOtp,
     resendOtp,
     forgotPassword,
     verifyForgotPasswordOtp,
     changePassword,
     loggedInUser} = require('../controller/userController');
const { errorHandler } = require('../middleware/errorHandler');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { allowedTo } = require('../middleware/allowedTO');
const router = express.Router();

router.route('/register').post(errorHandler(userRegister))
router.route('/login').post(errorHandler(userLogin))
router.route('/logout').post(errorHandler(handleLogout))
router.route('/list').get(isAuthenticated,allowedTo('admin'),errorHandler(getAllUsers))
router.route('/loggedInUser').get(isAuthenticated,errorHandler(loggedInUser))
router.route('/delete/:id').delete(errorHandler(deleteUser))
router.route('/verifyOtp').post(errorHandler(verifyOtp))
router.route('/resendOtp').post(resendOtp)
router.route('/forgotPassword').post(errorHandler(forgotPassword))
router.route('/verifyForgotPasswordOtp/:email').post(errorHandler(verifyForgotPasswordOtp))
router.route('/changePassword/:email').post(errorHandler(changePassword))

module.exports = router
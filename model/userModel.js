const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
        required: true
        
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    otp:{
        type: String
    },
    otpExpiry:{
        type : Date
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    kycVerified:{
        type: Boolean,
        default : false
    },
    role:{
        type: String,
        enum: ['customer', 'admin', 'moderator'], 
        default: 'customer' 
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

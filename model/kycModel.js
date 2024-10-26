const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kycSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    yourPhoto: {
        type: String,  // URL or path to the photo
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    documentType: {
        type: String,
        required: true,
        enum: ['passport', 'national_id', 'driver_license'],
    },
    documentNumber: {
        type: String,
        required: true,
    },
    documentImage: {
        type: String,  // URL or path to the document image
        required: true,
    },
    currentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    maritalStatus: {
        type: String,
        enum: ['single', 'married', 'divorced', 'widowed'],
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending', 
    },
    rejectionReason: {
        type: String, 
        default: ''
    },
    submittedAt: {
        type: Date,
        default: Date.now, 
    },
    verifiedAt: {
        type: Date, 
    }
});

const Kyc = mongoose.model('Kyc', kycSchema);
module.exports = Kyc;

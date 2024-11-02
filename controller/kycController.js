const Kyc = require("../model/kycModel");
const User = require("../model/userModel");

exports.createKyc = async (req, res) => {
    const {
        dob,
        gender,
        documentType,
        documentNumber,
        currentAddress,
        permanentAddress,
        fatherName,
        motherName,
        maritalStatus,
        occupation
    } = req.body;

    const userId = req.userId;
    const youName = req.user.fullName;

    if (!dob || !gender || !documentType || !documentNumber || 
        !currentAddress || !permanentAddress || !fatherName || !motherName || 
        !maritalStatus || !occupation) {
        return res.status(400).json({
            message: 'Please fill all the fields'
        });
    }

    if (!req.files || !req.files['yourPhoto'] || !req.files['documentImage']) {
        return res.status(400).json({
            message: "Please provide both your photo and document image"
        });
    }

    const yourPhoto = req.files['yourPhoto'][0].filename; // Access the user's photo
    const documentImage = req.files['documentImage'][0].filename; // Access the document image

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    if(!user.isVerified){
        return res.status(400).json({
            message: 'Please Verify your gmail first!'
            });
    }

    const kycExist = await Kyc.findOne({ userId });
    if (kycExist) {
        return res.status(400).json({
            message: "KYC already submitted"
        });
    }

    const kyc = await Kyc.create({
        userId,
        yourPhoto,
        dob,
        gender,
        documentType,
        documentNumber,
        documentImage,
        currentAddress,
        permanentAddress,
        fatherName,
        motherName,
        maritalStatus,
        occupation
    });

    res.status(200).json({
        message: "KYC submitted successfully",
        kyc
    });
};


exports.verifyKyc = async (req, res) => {
        const kycId = req.params.kycId;
        const { status, rejectionReason } = req.body;

        const kyc = await Kyc.findById(kycId);
        if (!kyc) {
            return res.status(404).json({
                message: "No KYC found"
            });
        }

        if (status !== 'approved' && status !== 'rejected') {
            return res.status(400).json({
                message: "Invalid status value. It must be 'approved' or 'rejected'."
            });
        }

        kyc.status = status;
        if (status === 'approved') {
            kyc.rejectionReason = null;
            kyc.verifiedAt = new Date().toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        } else if (status === 'rejected') {
            if (!rejectionReason) {
                return res.status(400).json({
                    message: "Rejection reason must be provided when the status is 'rejected'."
                });
            }
            kyc.rejectionReason = rejectionReason;
        }

        await kyc.save();

        res.status(200).json({
            message: `KYC ${status} successfully`
        });
};

exports.getAllKyc = async (req, res) => {

        const kycs = await Kyc.find()
            .populate({
                path: 'userId', // Path to populate
                select: 'fullName email phone' // Fields to include from the User model
            });

        res.status(200).json(kycs);
};

//singlekyc
exports.getSingleKyc = async (req, res) => {
    const kycId = req.params.id;
    const userId = req.userId;
    const kyc = await Kyc.findById(kycId).populate('userId');
    res.status(200).json({
        message: "Single kyc fetched",
        kyc
    })


}

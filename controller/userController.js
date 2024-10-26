
const User = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require("../services/sendMail");


const {JWT_SECRET,NODE_ENV} = process.env


//register
exports.userRegister = async (req, res) => {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            message: "Please fill all fields",
        });
    }

        const existingUserEmail = await User.findOne({ email });
        const existingUserPhone = await User.findOne({ phone });

        if (existingUserEmail || existingUserPhone) {
            return res.status(400).json({
                message: "User already exists with this email or phone number",
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        //generate 6 digit otp
        const otp = crypto.randomInt(100000,999999).toString();
        const otpExpiry = new Date(Date.now() + 10*60*1000); // its valid for 10 min

        const user = await User.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
            otp,
            otpExpiry,
            isVerified : false
        });
        sendEmail({
            email,
            subject: "Verify your email",
            text: `Your OTP is ${otp} `
        })

        return res.status(200).json({
            message: "OTP sent to your email. Please verify your account."
        });
};


//login
exports.userLogin = async (req, res) => {
    const { email, password, phone } = req.body;

    if (!email && !phone) {
        return res.status(400).json({
            message: "Please enter either phone or email"
        });
    }

    if (!password) {
        return res.status(400).json({
            message: "Please enter your password"
        });
    }

        let user;
        if (email) {
            user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: "No user found with this email"
                });
            }
        } else if (phone) {
            user = await User.findOne({ phone });
            if (!user) {
                return res.status(400).json({
                    message: "No user found with this phone number"
                });
            }
        }
        if(!user.isVerified){
            res.status(400).json({
                message: "Please verify your account first"
            })
        }


        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "30d"
        });

        res.cookie("carToken", token, {
            httpOnly: true, 
            secure: NODE_ENV === 'production' 
        });

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            },
            token
        });
  
};



//logout
exports.handleLogout = (req,res)=>{
    res.clearCookie("carToken");
    res.status(200).json({
        message: "Logout Successfully"
    })
}

//getAll users
exports.getAllUsers = async(req,res)=>{
    const users = await User.find();
    res.status(200).json({
        message: "user fetch successfully",
        users
    })
}

//login user
exports.loggedInUser = async(req,res)=>{
    const userId = req.userId;
    const user = await User.findById(userId);
    if(!user){
        return res.status(404).json({
            message: "User not found"
            })
        }
            res.status(200).json({
                message: "User found successfully",
                user
            })
}

//deleteusers
exports.deleteUser = async(req,res)=>{
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({
        message: "user deleted successfully",
        user

    })
}

exports.verifyOtp = async(req,res)=>{
    const {email,otp}=req.body

    if(!email || !otp){
        return res.status(400).json({
            message: "please provide email and OTP"
        });
    }

    const user = await User.findOne({email,otp});
    if(!user){
        return res.status(400).json({
            message: "Invalid OTP or email"
        });
    }

    if(user.otpExpiry < new Date()){
        return res.status(400).json({
            message: "OTP expired"
            });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({
        message: "User verified and registered successfully",
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone
        }
    });

}


// Resend OTP function
exports.resendOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Please provide your email",
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User not found with this email",
        });
    }

    if (user.isVerified) {
        return res.status(400).json({
            message: "User is already verified",
        });
    }


    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    sendEmail({
        email: user.email,
        subject: "Resend OTP - Verify your email",
        text: `Your new OTP is ${otp}. It is valid for the next 10 minutes.`,
    });

    return res.status(200).json({
        message: "New OTP sent to your email. Please verify your account.",
    });
};

exports.forgotPassword = async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(400).json({
            message: "please Enter email"
        })
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(404).json({
            message: "User not found with this email",
            });
        }
            const otp=crypto.randomInt(100000,999999).toString();
            const otpExpiry=new Date(Date.now()+10*60*1000);//Valid for 10 min
            user.otp=otp;
            user.otpExpiry=otpExpiry;
            await user.save();
            sendEmail({
                email,
                subject: "Reset Password - Verify your email",
                text: `Your new OTP is ${otp}. It is valid for the next 10 minutes`
            })
            return res.status(200).json({
                message: "New OTP sent to your email. Please reset your password.",
                email
                });
};

exports.verifyForgotPasswordOtp = async(req,res)=>{
    const {otp}=req.body;
    const {email} = req.params
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({
            message: "User not found with this email",
            });
            }
            if(user.otpExpiry<new Date()){
                return res.status(400).json({
                    message: "OTP has expired. Please request a new OTP.",
                    });
                    }
                    if(user.otp!==otp){
                        return res.status(400).json({
                            message: "Invalid OTP",
                            });
                            }
                            user.otp=null;
                            user.otpExpiry=null;
                            await user.save();
                            return res.status(200).json({
                                message: "OTP verified successfully",
                                email
                            })
}

exports.changePassword = async (req, res) => {
    const { password, passwordConfirm } = req.body;
    const { email } = req.params;
    
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found with this email",
            });
        }

        if (password !== passwordConfirm) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }
        
        user.password = bcrypt.hashSync(password, 8);
        await user.save();

        return res.status(200).json({
            message: "Password changed successfully",
        })
 
};
const fs = require('fs'); 
const path = require('path');
const Profile = require("../model/profileModel");
const User = require("../model/userModel");

exports.createProfile = async (req, res) => {
    const { fullName, about } = req.body;  
    const userId = req.userId;

    if (!req.file) {
        return res.status(400).json({
            message: "Please upload a profile picture"
        });
    }

    const photo = req.file.filename;

    // Find the user by userId
    const user = await User.findOne({ _id: userId });
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const email = user.email;
    const phone = user.phone;

        // Create the profile
        const newProfile = await Profile.create({
            fullName, 
            email,
            phone,
            photo,
            about,
            userId
        });

        res.status(201).json({
            message: "Profile created successfully",
            newProfile
        });
   
};

//editprofile

exports.editProfile = async (req, res) => {
    const { fullName, about } = req.body;
    const userId = req.userId; 

    let newPhoto;
    if (req.file) {
        newPhoto = req.file.filename; 
    }

    // user by userId
    const user = await User.findOne({ _id: userId });
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const profile = await Profile.findOne({ userId });
    if (!profile) {
        return res.status(404).json({
            message: "Profile not found"
        });
    }

    // If a new photo is provided, delete the previous one
    if (newPhoto && profile.photo) {
        const previousPhotoPath = path.join(__dirname, '../uploads', profile.photo); 
        fs.unlink(previousPhotoPath, (err) => {
            if (err) {
                console.error('Failed to delete previous photo:', err);
            } else {
                console.log('Previous photo deleted successfully');
            }
        });
    }

    // Update 
    profile.fullName = fullName || profile.fullName;
    profile.about = about || profile.about;

    if (newPhoto) {
        profile.photo = newPhoto;
    }

    await profile.save();

    res.status(200).json({
        message: "Profile updated successfully",
        profile
    });
};




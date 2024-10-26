const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    photo:{
        type: String

    },
    about:{
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;

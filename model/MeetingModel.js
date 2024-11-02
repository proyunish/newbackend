const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
   
    
    email: {
        type: String,
        required: true
        
    },
    option:{
        type: String,
        required: true
    },

});

const Meeting = mongoose.model('Meetings', profileSchema);
module.exports = Meeting;

const ConnectionString = "mongodb+srv://aashisrijal252:4evBXtwmWYPrPc2c@car-website.kcwsp.mongodb.net/?retryWrites=true&w=majority&appName=car-website";
const mongoose = require('mongoose');

async function connectToDatabase(){
    try{
    await mongoose.connect(ConnectionString);
    console.log("Database Connected successfully");
    }
    catch(err){
        console.log("Error in connecting to database",err);
    }
}

module.exports = connectToDatabase;
const User = require("../model/userModel");
const bcrypt = require("bcrypt");


const adminSeeder = async () => {
    try {
        // Find the admin user by email
        email = "yunishpandit98@gmail.com";
        const data = await User.findOne({email})

        // If the user does not exist, create it
        if (!data) {
            await User.create({
                fullName: "Yunish Pandit",
                email: "yunishpandit98@gmail.com",
                phone : "9898989898",
                password: bcrypt.hashSync("admin", 10), // Hash the password
                role: "admin" // Set the role as admin
            });
            console.log("Admin credentials seeded successfully");
        } else {
            console.log("Admin credentials already seeded");
        }
    } catch (error) {
        console.error("Error seeding admin credentials:", error);
    }
};

module.exports = adminSeeder;

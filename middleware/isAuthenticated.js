const jwt = require('jsonwebtoken');
const { promisify } = require('util'); 
const User = require('../model/userModel');
const JWT_SECRET = process.env.JWT_SECRET; 

exports.isAuthenticated = async (req, res, next) => {
    try {
        // check cookie
        // const token = req.cookies.carToken;
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: 'You are not logged in(token invalid)!'
            });
        }

        // Verify the token
        const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: 'User does not exist'
            });
        }

        req.user = user;
        req.userId = user._id;

        next();

    } catch (err) {
        console.error(err); 
        return res.status(401).json({
            message: 'Authentication failed!'
        });
    }
};
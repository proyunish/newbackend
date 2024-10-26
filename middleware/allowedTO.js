exports.allowedTo = (...roles) => {
    return (req, res, next) => {
        let userRole = req.user?.role;
        if (!roles.includes(userRole)) {
            return res.status(403).json({
                message: "You don't have permission"
            });
        } 
        
        next();
    };
};

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require('dotenv').config()

const optionalAuth = async (req, res, next) => {
    try {
        const { token } = await req.cookies;
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findById(decoded._id);
            if (user) {
                req.user = user; // Attach user to request
            }
        }
    } catch (error) {
    }
    next();
};

module.exports = optionalAuth;
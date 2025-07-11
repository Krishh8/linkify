const jwt = require("jsonwebtoken")
require('dotenv').config()
const User = require("../models/userModel")

const userAuth = async (req, res, next) => {
    try {
        const { token } = await req.cookies;
        if (!token) {
            throw new Error("token is not valid.");
        }
        const decodedObj = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { _id } = decodedObj;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("Not valid user.");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong : " + error });
    }
}

module.exports = userAuth;

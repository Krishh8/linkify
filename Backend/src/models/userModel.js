const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const validator = require("validator")
require('dotenv').config()

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        },
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpires: Date,
})

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
    return token;
}

userSchema.methods.validatePassword = async function (passwordByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordByUser, passwordHash);
    return isPasswordValid;
}

const User = mongoose.model('User', userSchema);
module.exports = User;


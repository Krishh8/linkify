require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const User = require('../models/userModel');
const { validateSignUpData, validateLoginData } = require('../utils/validation');
const { sendVerificationEmail } = require('../utils/sendEmail');
const userAuth = require('../middlewares/auth');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    try {
        validateSignUpData(req);
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists with this email." });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString("hex");

        const user = new User({
            email,
            password: passwordHash,
            isVerified: false,
            verificationToken,
            verificationTokenExpires: Date.now() + 1000 * 60 * 60 * 24 // 24 hours
        });
        await user.save();

        const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
        await sendVerificationEmail(email, verifyUrl);

        return res.status(201).json({ success: 'true', message: "User created successfully." });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        validateLoginData(req);
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: "Please verify your email first" });
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

        const token = await user.getJWT();
        res.cookie('token', token, {
            expires: new Date(Date.now() + 7 * 24 * 3600000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        })
        return res.status(200).json({
            success: 'true', message: "Login successfully", user: {
                email: req.user.email,
                userId: req.user._id,
                isVerified: req.user?.isVerified
            }
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
})

authRouter.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ success: 'true', message: "Logout successfully" });
})

authRouter.get('/me', userAuth, async (req, res) => {
    const user = {
        email: req.user.email,
        userId: req.user._id,
        isVerified: req.user?.isVerified
    }
    return res.status(200).json({
        success: true,
        user
    });
});

authRouter.post("/send-email", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");

        user.verificationToken = verificationToken;
        user.verificationTokenExpires = Date.now() + 1000 * 60 * 60 * 24;
        await user.save();

        const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
        await sendVerificationEmail(email, verifyUrl);
        await user.save();

        res.status(200).json({ success: 'true', message: "Email sent successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message || "Email can't sent" });
    }
});

authRouter.get("/verify-email/:token", async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        res.status(200).json({ success: 'true', message: "Email verified successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message || "Email verification failed" });
    }
});

authRouter.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 1000 * 60 * 15; // 15 mins
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        await sendVerificationEmail(email, resetUrl);

        res.status(200).json({ success: true, message: "Reset password email sent" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message || "Password reset error" });
    }
});

authRouter.post("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message || "Password reset failed" });
    }
});


module.exports = authRouter;
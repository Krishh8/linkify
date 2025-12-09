require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const User = require('../models/userModel');
const { validateSignUpData, validateLoginData, validateEmail, validatePasswordReset } = require('../utils/validation');
const userAuth = require('../middlewares/auth');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const sendPasswordResetEmail = require('../utils/sendPasswordResetEmail');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    try {
        validateSignUpData(req);
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        // If user exists and is verified, reject signup
        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email and is verified."
            });
        }

        // Hash password and generate verification token
        const passwordHash = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpires = Date.now() + 1000 * 60 * 60 * 24; // 24 hours

        // If unverified user exists, update it; otherwise create new user
        let user;
        if (existingUser && !existingUser.isVerified) {
            // Update existing unverified user with new password and token
            existingUser.password = passwordHash;
            existingUser.verificationToken = verificationToken;
            existingUser.verificationTokenExpires = verificationTokenExpires;
            user = await existingUser.save();
        } else {
            // Create new user
            user = new User({
                email,
                password: passwordHash,
                isVerified: false,
                verificationToken,
                verificationTokenExpires
            });
            await user.save();
        }

        // Send verification email
        const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
        try {
            await sendVerificationEmail(email, verifyUrl);
        } catch (emailError) {
            // If email fails, still return success but log the error
            console.error("Failed to send verification email:", emailError);
            // Optionally, you could delete the user here if email is critical
        }

        return res.status(201).json({
            success: true,
            message: "User created successfully. Please check your email to verify your account."
        });

    } catch (error) {
        // Handle MongoDB duplicate key error (race condition)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            });
        }
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
            return res.status(401).json({ success: false, message: "Please verify your email first" });
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = user.getJWT();

        const isProduction = process.env.NODE_ENV === 'production';

        res.cookie('token', token, {
            expires: new Date(Date.now() + 7 * 24 * 3600000),
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            path: '/',
        })
        return res.status(200).json({
            success: true,
            message: "Login successfully",
            user: {
                email: user.email,
                userId: user._id,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
})

authRouter.post('/logout', (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production';
    res.clearCookie('token', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',
    });
    return res.status(200).json({ success: true, message: "Logout successfully" });
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
        validateEmail(req);
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: "User already verified" });
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");

        user.verificationToken = verificationToken;
        user.verificationTokenExpires = Date.now() + 1000 * 60 * 60 * 24;
        await user.save();

        const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
        await sendVerificationEmail(email, verifyUrl);

        res.status(200).json({ success: true, message: "Verification email sent successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message || "Email can't be sent" });
    }
});

authRouter.post("/verify-email/:token", async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({ success: false, message: "Token is required" });
        }

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message || "Email verification failed" });
    }
});

authRouter.post("/forgot-password", async (req, res) => {
    try {
        validateEmail(req);
        const { email } = req.body;

        const user = await User.findOne({ email });

        // Security: Don't reveal if user exists or not
        // Always return success message to prevent email enumeration
        if (!user) {
            // Still return success to prevent user enumeration attacks
            return res.status(200).json({
                success: true,
                message: "If an account exists with this email, a password reset link has been sent."
            });
        }

        // Only allow password reset for verified users
        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Please verify your email first before resetting password."
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 1000 * 60 * 15; // 15 mins
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        try {
            await sendPasswordResetEmail(email, resetUrl);
        } catch (emailError) {
            console.error("Failed to send password reset email:", emailError);
            // Still return success to prevent user enumeration
        }

        res.status(200).json({
            success: true,
            message: "If an account exists with this email, a password reset link has been sent."
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message || "Password reset error" });
    }
});

authRouter.post("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword, confirmPassword } = req.body;

        if (!token) {
            return res.status(400).json({ success: false, message: "Token is required" });
        }

        // Validate password and confirm password
        validatePasswordReset(req);

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        // Validation errors should return 400, not 500
        const statusCode = error.message.includes("required") ||
            error.message.includes("match") ||
            error.message.includes("strong enough")
            ? 400 : 500;
        return res.status(statusCode).json({ success: false, message: error.message || "Password reset failed" });
    }
});


module.exports = authRouter;
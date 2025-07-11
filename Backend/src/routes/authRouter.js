const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { validateSignUpData, validateLoginData } = require('../utils/validation');
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

        const user = new User({ email, password: passwordHash });
        await user.save();

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

        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie('token', token, { expires: new Date(Date.now() + 7 * 24 * 3600000), httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', })
            return res.status(200).json({ success: 'true', message: "Login successfully.", user: user });
        }
        else {
            throw new Error("Invalid credentials.")
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
})

authRouter.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ success: 'true', message: "Logout successfully." });
})

authRouter.get('/me', userAuth, async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
});

module.exports = authRouter;
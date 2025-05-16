const express = require('express');
const userAuth = require('../middlewares/auth');
const Url = require('../models/urlModel');
const userRouter = express.Router();

userRouter.get('/dashboard', userAuth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({ success: false, message: "token not valid." });
        }

        const urls = await Url.find({ createdBy: user._id }).sort({ createdAt: -1 })
        return res.status(200).json({ success: true, message: 'Urls fetches successfully.', urls: urls })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong : " + error });
    }
})

module.exports = userRouter
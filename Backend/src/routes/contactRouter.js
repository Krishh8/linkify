const express = require('express');
const contactRouter = express.Router();
const Contact = require('../models/contactModel');
const optionalAuth = require('../middlewares/optionalAuth');

contactRouter.post('/send', optionalAuth, async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newMessage = await Contact.create({
            name,
            email,
            message,
            userId: req.user?._id || null
        });

        res.status(201).json({
            message: "Message submitted successfully.",
            data: newMessage
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

module.exports = contactRouter;
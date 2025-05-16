const express = require('express');
const { validateUrlData } = require('../utils/validation');
const urlRouter = express.Router();
const { nanoid } = require('nanoid');
const Url = require('../models/urlModel');
const { BASE_URL } = require('../constants');
const optionalAuth = require('../middlewares/optionalAuth');

const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

urlRouter.post('/shorten', optionalAuth, async (req, res) => {
    try {
        validateUrlData(req);
        const { originalUrl, shortUrl } = req.body;
        const user = req.user;
        const isLoggedIn = user ? true : false;

        if (shortUrl) {
            const existing = await Url.findOne({ shortUrl });
            if (existing) {
                return res.status(400).json({ success: false, message: "Custom URL already exists." });
            }
        }

        const shortId = shortUrl || nanoid(7);
        const expirationTime = new Date(Date.now() + (isLoggedIn ? ONE_MONTH : THREE_DAYS));

        const newUrl = new Url({
            originalUrl,
            shortUrl: shortId,
            createdBy: user ? user._id : null,
            expiresAt: expirationTime,
        });

        await newUrl.save();

        res.status(201).json({
            success: true, message: 'ShortUrl generated successfully.', shortUrl: `${BASE_URL}/api/url/${shortId}`, newUrl
        });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
})

urlRouter.get('/:shortUrl', async (req, res) => {
    try {
        const { shortUrl } = req.params;

        if (!shortUrl) {
            return res.status(400).json({ success: false, message: "Not valid short url." });
        }

        const urlInfo = await Url.findOne({ shortUrl });
        if (!urlInfo) {
            return res.status(400).json({ success: false, message: "Short URL not found." });
        }
        if (urlInfo.expiresAt && urlInfo.expiresAt < new Date()) {
            return res.status(410).send({ success: false, message: "This short URL has expired." });
        }

        urlInfo.clickCount += 1;
        await urlInfo.save();

        res.redirect(urlInfo.originalUrl);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
})

urlRouter.get('/stats/:shortUrl', async (req, res) => {
    try {
        const { shortUrl } = req.params;

        if (!shortUrl) {
            return res.status(400).json({ success: false, message: "Not valid short url." });
        }

        let urlInfo = await Url.findOne({ shortUrl });
        if (!urlInfo) {
            return res.status(400).json({ success: false, message: "Short URL not found." });
        }

        urlInfo = {
            originalUrl: urlInfo.originalUrl,
            shortUrl: urlInfo.shortUrl,
            clickCount: urlInfo.clickCount,
            createdAt: urlInfo.createdAt,
            expiresAt: urlInfo.expiresAt,
        }

        return res.status(400).json({ success: true, message: "Short URL found.", data: urlInfo });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
})

urlRouter.put('/:id', async (req, res) => {
    try {
        validateUrlData(req);

        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ success: false, message: "URL not found" });
        }

        const { originalUrl, shortUrl } = req.body;

        const updated = await Url.findByIdAndUpdate(
            id,
            { originalUrl, shortUrl },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "URL not found" });
        }

        return res.status(200).json({ success: true, message: "URL updated successfully.", url: updated });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

urlRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ success: false, message: "URL not found" });
        }

        const deleted = await Url.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "URL not found" });
        }

        return res.status(200).json({ success: true, message: "URL deleted successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});


module.exports = urlRouter
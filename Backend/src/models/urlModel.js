const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: 'String',
        required: true,
    },
    shortUrl: {
        type: 'String',
        required: true,
        unique: true,
    },
    customUrl: {
        type: 'String',
        unique: true,
        sparse: true,
        minlength: [7, 'customUrl must be at least 7 characters long'],
        maxlength: [30, 'customUrl must be at most 30 characters long']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    clickCount: {
        type: Number,
        default: 0
    },
    expiresAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

const Url = new mongoose.model('Url', urlSchema);
module.exports = Url;
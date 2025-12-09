const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },

    // Optional fields
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    status: { type: String, default: "pending" },
    isReplied: { type: Boolean, default: false },
    reply: { type: String, default: "" }
},
    { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;

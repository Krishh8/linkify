const validator = require("validator")

const validateSignUpData = (req) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("Email and password are required.");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Not valid Email.")
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password not strong enough. Use 8+ characters, including uppercase, lowercase, number & symbol.");
    }
}

const validateLoginData = (req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("Email and password are required.");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Not valid Email.");
    }
};

const validateUrlData = (req) => {
    const { originalUrl, customUrl } = req.body;

    if (!originalUrl) {
        throw new Error("URL is required.");
    }

    if (!validator.isURL(originalUrl)) {
        throw new Error("Not a valid URL.");
    }

    if (customUrl && (customUrl.trim().length < 7 || customUrl.trim().length > 30)) {
        throw new Error("Custom URL must be between 7 and 30 characters long.");
    }
};


module.exports = { validateSignUpData, validateLoginData, validateUrlData }
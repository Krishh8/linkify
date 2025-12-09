const sendEmail = require("./sendEmail");
const loadEmailTemplate = require("./loadEmailTemplate");

const sendPasswordResetEmail = async (email, url, options = {}) => {
    const {
        service = "linkify",
        serviceName = "Linkify",
        expirationMinutes = 15
    } = options;

    // Format expiration text (e.g., "15 minutes" or "1 minute")
    const expirationText = `${expirationMinutes} ${expirationMinutes === 1 ? 'minute' : 'minutes'}`;

    // Load template and replace placeholders
    const message = loadEmailTemplate("passwordReset", {
        url,
        serviceName,
        expirationText,
        service
    });

    await sendEmail(email, `Reset Your Password - ${serviceName}`, message);
};

module.exports = sendPasswordResetEmail;


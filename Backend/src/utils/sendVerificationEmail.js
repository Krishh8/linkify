const sendEmail = require("./sendEmail");
const loadEmailTemplate = require("./loadEmailTemplate");

const sendVerificationEmail = async (email, url, options = {}) => {
    const {
        service = "linkify",
        serviceName = "Linkify",
        expirationHours = 24
    } = options;

    // Format expiration text (e.g., "24 hours" or "1 hour")
    const expirationText = `${expirationHours} ${expirationHours === 1 ? 'hour' : 'hours'}`;

    // Load template and replace placeholders
    const message = loadEmailTemplate("emailVerification", {
        url,
        serviceName,
        expirationText,
        service
    });

    await sendEmail(email, `Verify Your Email - ${serviceName}`, message);
};

module.exports = sendVerificationEmail;

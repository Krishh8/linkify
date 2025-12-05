const sendEmail = require("./sendEmail");

const sendVerificationEmail = async (email, url) => {
    const message = `
        <h3>Email Verification</h3>
        <p>Click the link below to verify your email:</p>
        <a href="${url}" target="_blank" style="padding:10px;background:#0d6efd;color:#fff;text-decoration:none;border-radius:5px;">
            Verify Email
        </a>
    `;

    await sendEmail(email, "Verify Your Email", message);
};

module.exports = sendVerificationEmail;

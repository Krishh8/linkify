const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // use App Password if using Gmail
            },
        });

        await transporter.sendMail({
            from: `"Verify your Email" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email send failed:", error);
        throw new Error("Email not sent");
    }
};

module.exports = sendEmail;

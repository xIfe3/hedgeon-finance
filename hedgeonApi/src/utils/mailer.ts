import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const ADMIN_EMAIL = "support@hedgeonfinance.com";
const EMAIL_USER = "support@hedgeonfinance.com";
const EMAIL_PASSWORD = "Pass@hedgeon123";

// Configure your mailer
const transporter = nodemailer.createTransport({
    host: 'mail.spacemail.com',
    secure: true,
    port: 465,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
});

/**
 * Sends an email using an EJS template.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} templateName - The name of the EJS template file (without the .ejs extension).
 * @param {object} templateData - The data to pass to the EJS template.
 */
const sendEmail = async (to: string, subject: string, templateName: string, templateData: any) => {
    try {
        const templatePath = path.join(__dirname, '../views/emails', `${templateName}.ejs`);
        const emailHtml: string = await ejs.renderFile(templatePath, templateData);

        const mailOptions = {
            from: `"Jake from Hedgeon Finance" <${ADMIN_EMAIL}>`,
            to: to,
            subject: subject,
            html: emailHtml,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${to}`);
    } catch (error: any) {
        console.error(`Error sending email to ${to}:`, error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

export default sendEmail;

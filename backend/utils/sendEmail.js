const nodemailer = require('nodemailer');

// Create transporter (corrected from createTransporter to createTransport)
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: 'Fashion Fusion <noreply@fashionfusion.com>',
    to: options.to,
    subject: options.subject,
    html: options.text
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // your Gmail address
    pass: process.env.GMAIL_APP_PASS, // your app password from Google
  },
});

const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: `"Task Tracker 👨‍💻" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent ✅:', info.messageId);
  } catch (err) {
    console.error('❌ Email sending failed:', err);
  }
};

module.exports = sendMail;

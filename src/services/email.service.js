require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const services = {
  sendEmail: async ({ email, subject, html }) => {
    return transporter.sendMail({
      from: 'chatapp22072026@gmail.com',
      to: email,
      subject,
      html,
    });
  },
  sendActivationEmail: (email, token) => {
    const href = `${process.env.CLIENT_HOST}/activate/${token}`;

    const html = `
    <h1>Activate account</h1>
    <a href="${href}">${href}</a>
  `;

    return services.sendEmail({ email, subject: 'Activation email', html });
  },
};

module.exports = {
  services,
};

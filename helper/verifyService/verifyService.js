const nodemailer = require("nodemailer");
require("dotenv").config();

const verifyService = async (email, verificationToken) => {
  const link = `${process.env.BASE_URL}/api/users/verify/${verificationToken}`;
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "rufiktcl06@meta.ua",
      pass: process.env.PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: "rufiktcl06@meta.ua",
    to: email,
    subject: "Verification message",
    html: `
    <h1>Hello</h1>
    <p>For email verification</p>
    <p>Please click this<a href="${link}"> LINK</a>.</p>
  `,
  };

  try {
    await transporter.sendMail(emailOptions);
    return "ok";
  } catch (error) {
    return error;
  }
};

module.exports = verifyService;

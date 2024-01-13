const nodemailer = require("nodemailer");
exports.ConfigMail = () => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: "no.reply.srijan@gmail.com",
      pass: "siulquowkodnmyjw",
    },
  });
  return transporter;
};

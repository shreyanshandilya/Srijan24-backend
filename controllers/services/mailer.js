const nodemailer = require('nodemailer');
exports.ConfigMail=()=>{
    const config = {
        service : 'gmail',
        auth : {
            user: "",
            pass: "cqrcaqapdwrshanz" ,
        }
    }

    const transporter = nodemailer.createTransport(config);

   return transporter;
}

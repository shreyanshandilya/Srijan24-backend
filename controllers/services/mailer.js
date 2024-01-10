const nodemailer = require('nodemailer');
exports.ConfigMail=()=>{
    const config = {
        service : 'gmail',
        auth : {
            user: "21je1039@iitism.ac.in",
            pass: "cqrcaqapdwrshanz" ,
        }
    }

    const transporter = nodemailer.createTransport(config);

   return transporter;
}

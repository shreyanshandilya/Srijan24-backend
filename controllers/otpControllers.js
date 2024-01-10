const otpGenerator = require("otp-generator");
const User = require("../schemas/user");
 
const mailService=require("./services/mailer");
const MailTemplates=require("./mailTemplate");
// const {promisify}=require("util");
const nodemailer = require('nodemailer');
async function sendOTP(req, res, next){
    const { userId } = req;
    const user = await User.findOne({ _id: userId });
  
    const new_otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
  
       const otp_expiry_time = Date.now() + 10 * 60 * 1000;
  
      const new_user= await User.findByIdAndUpdate(userId, {
          otp_expiry_time
      }, { new: true, validateModifiedOnly: true });
  
      new_user.otp=new_otp.toString(),
      await new_user.save({ new: true, validateModifiedOnly: true });
  
    // TODO=>Send Mail 
  
    const message = {
      from : process.env.EMAIL,
      to : user.email,
      subject: "Account Verification for Your Chat Application",
      html: MailTemplates.otp(user.firstName,new_otp),
  }
  const transporter = mailService.ConfigMail();
  
    transporter.sendMail(message).then(() => {
      return res.status(201).json({
          status:"success",
          message: "Mail sent successfully"
      })
  }).catch((error) => {
      return res.status(500).json({ error })
  })
  
  };
  
  async function verifyOTP  (req, res, next){
    // Verify OTP and update user record accordingly
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
      otp_expiry_time: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).json({
        status: "error",
        message: "Email is Invalid or OTP expired",
      });
    }
    if (!(await user.correctOTP(otp, user.otp))) {
      res.status(400).json({
        status: "error",
        message: "OTP is incorrect",
      });
    }
    user.verified = true;
    user.otp = undefined;
    await user.save({ new: true, validateModifiedOnly: true });
  
    const token = signToken(user._id);
  
    res.status(200).json({
      status: "Success",
      message: "OTP verified successfully",
      token,
      user_id:user._id,
    });
  };
  
const otpGenerator = require("otp-generator");
const User = require("../schemas/userSchema");
const mailService = require("./services/mailer");
const MailTemplates = require("./mailTemplate");
const nodemailer = require("nodemailer");
const HttpError = require("../utils/HttpError");
const jwt = require("jsonwebtoken");

const sendOTP_signUP = async (req, res, next) => {
  let isISMUSer = req.body.IsISM;
  let Name = req.body.Name;
  let Email = req.body.Email;
  let PhoneNumber = req.body.PhoneNumber;
  let Password = req.body.Password;

  if (isISMUSer) {
    let check = Email.endsWith("iitism.ac.in");
    if (!check) {
      return next(new HttpError("Wrong Email address", 400));
    }
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ Email: Email });
  } catch (error) {
    return next(new HttpError("signing up failed try again later", 404));
  }

  if (existingUser && existingUser.verified) {
    return next(new HttpError("User already exists try again later", 422));
  }
  if(existingUser){
    await User.findByIdAndDelete(existingUser._id);
  }

  let new_otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  new_otp = new_otp.toString();
  const otp_expiry_time = Date.now() + 10*60*60;

  const createUser = new User({
    Name: Name,
    Email: Email,
    PhoneNumber: PhoneNumber,
    Password: Password,
    Merchandise: [],
    IsISM: isISMUSer,
    IsEvents: isISMUSer,
    IsProNight: isISMUSer,
    otp: new_otp,
    otp_expiry_time: otp_expiry_time,
  });
  let user;
  try {
    user = await createUser.save();
  } catch (error) {
    return next(new HttpError("Signning up failed try again later ", 500));
  }

  const message = {
    from: "fakeuseruser540@gmail.com",
    to: user.Email,
    subject: "Account Verification for Your Srijan Application",
    html: MailTemplates.otp(user.Name, new_otp),
  };
  const transporter = mailService.ConfigMail();

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        status: "success",
        message: "Mail sent successfully",
        Email: user.Email,
      });
    })
    .catch(async (error) => {
      try {
        await User.findOneAndDelete({Email :Email});
      } catch (err) {
        console.log(error);
      }
      return next(new HttpError("error occured in signing ", 404));
    });
};

const verifyOTP_signUP = async (req, res, next) => {
  const otp = req.body.otp;
  const Email = req.body.Email;
  const user = await User.findOne({
    Email: Email,
  });
  console.log(user);
  console.log("dgjnebfawnfjcnawafsjw");

  if (!user) {
    return next(new HttpError("user not found  ", 404));
  }
  if (otp != user.otp) {
    try {
      await User.findOneAndDelete({ Email: Email });
    } catch (error) {
      return next(new HttpError("wrong otp try generate new otp", 404));
    }
    return next(new HttpError("incorrect otp ", 404));
  }
  if (user.otp_expiry_time < Date.now()) {
    try {
      await User.findOneAndDelete({ Email: Email });
    } catch(err) {
     console.log(err)
    }
    return next(new HttpError("otp expired try again fron start", 400));
  }

  user.verified = true;
  user.otp = "notvalid";

  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }

  let token;
  try {
    token = jwt.sign({ UserId: user._id }, "siddharth", {
      expiresIn: "30d",
    });
  } catch (err) {
    await User.findOneAndDelete({ Email: Email });
    return next(new HttpError("signing up failed try again later ", 500));
  }

  res.status(200).json({
    status: "Success",
    message: "OTP verified successfully",
    token: token,
  });
};

exports.sendOTP_signUP = sendOTP_signUP;
exports.verifyOTP_signUP = verifyOTP_signUP;

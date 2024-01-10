const User= require('../schemas/userSchema');
const jwt = require("jsonwebtoken");
const HttpError= require('../utils/HttpError');


const signup = async (req, res, next) => {

    let isISMUSer= req.body.IsISM;
    let Name = req.body.Name;
    let Email = req.body.Email;
    let PhoneNumber = req.body.PhoneNumber;
    let Password = req.body.Password;

    if(isISMUSer){
        let check = Email.endsWith("iitism.ac.in");
        if(!check){
            return next(new HttpError("Wrong Email address" , 400));
        }
    }
  
  
    let existingUser;
    try {
      existingUser = await User.findOne({ Email: Email });
    } catch (error) {
      return next(new HttpError("signning up failed try again later", 404));
    }
  
    if (existingUser) {
      return next(new HttpError("User already exist try again later", 422));
    }
  
    const createUser = new User({
      Name: Name,
      Email: Email,
      PhoneNumber: PhoneNumber,
      Password: Password,
      Merchandise : [],
      IsISM:isISMUSer ,
      IsEvents:isISMUSer ,
      IsProNight:isISMUSer
    });
    let newUser;
    try {
      newUser = await createUser.save();
    } catch (error) {
      return next(new HttpError("Signning up failed try again later ", 500));
    }
  
    let token;
    try {
      token = jwt.sign({ UserId: createUser._id }, "Ratul_BHai_ka_aga_koi_bol", {
        expiresIn: "30d",
      });
    } catch (err) {
      return next(new HttpError("signning up failed try again later ", 500));
    }

     
    console.log(token , createUser._id);
    res.json({
      Token: token,
      UserId: createUser._id,
    });
  };

  const login = async (req, res, next) => {
   
    let Email = req.body.Email;
    let Password = req.body.Password;
  
    let existingUser;
    try {
      existingUser = await User.findOne({ Email: Email });
    } catch (error) {
      return next(new HttpError("Logging up failed try agin later ", 500));
    }
  
    if (!existingUser) {
      return next(new HttpError("wrong credentials", 422));
    }
  
    let isValidPassword = false;
  
    if (Password !=existingUser.Password) {
      const error = new HttpError(
        "Invalid credentials, could not log you in.",
        403
      );
      return next(error);
    }
  
    let token;
    try {
      token = jwt.sign({ UserId: existingUser._id }, "siddharth", {
        expiresIn: "1h",
      });
    } catch (err) {
      return next(new HttpError("signning up failed try again later ", 500));
    }
  
    res.json({
      UserId: existingUser._id,
      Token: token,
    });
  };

  exports.signup=signup;
  exports.login=login;
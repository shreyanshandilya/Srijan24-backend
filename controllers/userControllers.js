const User= require('../schemas/userSchema');
const jwt = require("jsonwebtoken");
const HttpError= require('../utils/HttpError');

const signup = async (req, res, next) => {

    let isISMUSer= req.body.isISM;
    let Name = req.body.Name;
    let Email = req.body.Email;
    let PhoneNumber = req.body.Number;
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
      return next(new HttpError("signning up failed try again later", 500));
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
      IsISM:isISMUSer ? true: false,
      IsEvents:isISMUSer ? true: false,
      IsProNight:isISMUSer ? true: false
    });
    let newUser;
    try {
      newUser = await createUser.save();
    } catch (error) {
      return next(new HttpError("Signning up failed try again later ", 500));
    }
  
    let token;
    try {
      token = jwt.sign({ UserId: createUser._id }, "siddharth", {
        expiresIn: "30d",
      });
    } catch (err) {
      return next(new HttpError("signning up failed try again later ", 500));
    }
     
    console.log(token , createUser._id);
    res.json({
      Token: token,
      UserId: createUser._id,
      IsISM: isISMUSer
    });
  };

  exports.signup=signup;
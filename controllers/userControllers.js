const User= require('../schemas/userSchema');
const jwt = require("jsonwebtoken");
const HttpError= require('../utils/HttpError');

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
        expiresIn: "30d",
      });
    } catch (err) {
      return next(new HttpError("signning up failed try again later ", 500));
    }
  
    res.json({
      UserId: existingUser._id,
      Token: token,
    });
  };


  const purchaseMerchandise= async (req,res,next)=>{
    console.log(req.body);
  };

  exports.login=login;
  exports.purchaseMerchandise= purchaseMerchandise
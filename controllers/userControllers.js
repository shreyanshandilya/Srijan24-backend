const User = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const HttpError = require("../utils/HttpError");
const bcrypt = require("bcryptjs");

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
  try {
    isValidPassword = await bcrypt.compare(Password, existingUser.Password);
  } catch (err) {
    return next(new HttpError("Login up Failed", 500));
  }

  if (!isValidPassword) {
    return next(new HttpError("Worng Password", 403));
  }

  let token;
  try {
    token = jwt.sign({ UserId: existingUser._id }, "siddharth", {
      expiresIn: "30d",
    });
  } catch (err) {
    return next(new HttpError("signning up failed try again later ", 500));
  }

  return res.status(200).json({
    UserId: existingUser._id,
    Token: token,
    User: existingUser,
  });
};

// const purchaseMerchandise = async (req, res, next) => {
//   const userId = req.userData.UserId;

//   let user;
//   try {
//     user = await User.findById(userId);
//   } catch (error) {
//     return next(new HttpError("user not found", 404));
//   }

//   let tshirtSize = req.body.tshirtSize;
//   let address = req.body.address;
//   let quantity = req.body.quantity;
//   let type = req.body.type;

//   user.Merchandise.push({
//     tshirtSize: tshirtSize,
//     address: address,
//     type: type,
//     approved: false,
//     quantity: quantity,
//     type: type
    
//   });
//   console.log(user);
//   let response;
//   try {
//     response = await user.save();
//     return res.status(200).json(response);
//   } catch (error) {
//     return next(new HttpError("error ", 404));
//   }
// };

const getUser = async (req, res, next) => {
  const userId = req.userData.UserId;
  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("user not found", 404));
  }
  res.json(user);
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (error) {
    return next(new HttpError("user not found", 404));
  }
  res.json(users);
};
exports.login = login;
// exports.purchaseMerchandise = purchaseMerchandise;
exports.getUser = getUser;
exports.getUsers = getUsers;

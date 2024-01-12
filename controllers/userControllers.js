const User = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const HttpError = require("../utils/HttpError");

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

  if (Password != existingUser.Password) {
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

const purchaseMerchandise = async (req, res, next) => {
  const userId = req.userData.UserId;

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("user not found", 404));
  }

  let tshirtSize = req.body.tshirtSize;
  let address = req.body.address;
  let quantity = req.body.quantity;
  const { path: imageURL } = req.file;
  console.log(user);
  user.Merchandise.push({
    tshirtSize: tshirtSize,
    address: address,
    imageURL: imageURL,
    approved: false,
    quantity: quantity,
  });
  console.log(user);
 let response
  try {
    response =  await user.save();
    return res.status(200).json(response);
  } catch (error) {
    return next(new HttpError("error ", 404));
  }
};

exports.login = login;
exports.purchaseMerchandise = purchaseMerchandise;

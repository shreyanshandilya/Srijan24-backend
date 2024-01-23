const User = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const HttpError = require("../utils/HttpError");
const bcrypt = require("bcryptjs");
const UserEvents = require("../schemas/userEventsSchema");
const EventsData = require("../schemas/eventsRegistration");
const Accomodation = require("../schemas/accomodationSchema");

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

const userEventRegistered = async (req, res, next) => {
  const userId = req.userData.UserId;
  console.log(userId);
  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("user not found", 404));
  }
  console.log(user);

  const Email = user.Email;
  let response;
  try {
    response = await UserEvents.findOne({ Email: Email });
  } catch (error) {
    return next(new HttpError("error occured", 404));
  }
  console.log(response);
  let EventsRegisteredByUser = response.EventsRegistered;

  function filterUniqueElements(arr) {
    const uniqueElements = Array.from(new Set(arr));
    return uniqueElements;
  }
  let filteredArray = filterUniqueElements(EventsRegisteredByUser);
  console.log(filteredArray);
  let ans = [];
  for (let i = 0; i < filteredArray.length; i++) {
    const value = filteredArray[i];
    try {
      data = await EventsData.find({
        EventName: value,
        "Teams.MembersList.Email": Email,
      });
      console.log(data);
      ans.push(...data);
    } catch (error) {
      return next(new HttpError("error", 404));
    }
  };
 
  res.json(ans);
};


const userAccomodation =async (req,res ,next)=>{
  const userId = req.userData.UserId;
  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("user not found", 404));
  }
  let response;
  try{  
    response = await  Accomodation.find({Email: user.Email});
    
  }catch(error){
    return next(new HttpError("error" ,404))
  }
  res.json(response);

}

const accomodationData= async(req,res,next)=>{
  let response ;
  try{
    response= await Accomodation.find();

  }catch(error){
    return next(new HttpError("Error occured in fetching data  of accomdation" ,404))
  }
  for(let  i=0 ;i<response.length  ;i++){
    let Email= response[i].Email;
    let data;
    try{
      data= await User.findOne({Email :Email});
      response[i] ={...response[i]._doc  , userData : data};
    }catch(error){
      return next(new HttpError("error" ,404));
    }

  }
  res.json(response);

}
exports.login = login;
exports.getUser = getUser;
exports.getUsers = getUsers;
exports.userEventRegistered = userEventRegistered;
exports.userAccomodation=userAccomodation;
exports.accomodationData=accomodationData;
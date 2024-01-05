const Purchase = require("../schemas/merchandiseSchema");
const HttpError = require("../utils/HttpError");

const postTshirt = async (req, res, next) => {
  try {
    const {
      name,
      admissionNumber,
      mobileNumber,
      tshirtSize,
      hostel,
      roomNumber,
      quantity
    } = req.body;
    const { path: imageURL } = req.file;
    const newPurchase = new Purchase({
      name,
      admissionNumber,
      mobileNumber,
      tshirtSize,
      hostel,
      roomNumber,
      imageURL,
      approved: false,
      quantity
    });
    const data = await newPurchase.save();

    return res.status(200).json({
      msg: "Your order has been confirmed successfully! ",
    });
  } catch (e) {
    return next(new HttpError("erorr occured try again later", 404));
  }
};

const getAllOrders = async (req, res, next) => {
  let Orders;
  try {
    Orders = await Purchase.find();
    if (!Orders) {
      return next(new HttpError("Error occured try again", 404));
    }
    console.log(Orders);
    res.json(Orders);
  } catch (error) {
    return next(new HttpError("can not get orders try again later", 404));
  }
};

const changeParticularApproval = async (req, res, next) => {
  const purchaseId = req.params.purchaseId;
  try {
    const purchaseItem = await Purchase.findByIdAndUpdate(purchaseId,{approved:true});

    if (!purchaseItem) {
      console.log("not found");
      return next(new HttpError("error occured try again  later", 404));
    }
    res.status(200).json({ msg: "approval done", purchaseItem });
  } catch (error) {
    return next(new HttpError("error occured try agin ", 404));
  }
};

const getParticularPhoneNumber = async (req, res, next) => {
  let phoneNumber = req.params.phoneNumber;
  console.log(phoneNumber);
  let purchaseItem;
  try {
    purchaseItem = await Purchase.find({"mobileNumber":phoneNumber});
    if (!purchaseItem) {
      return next(new HttpError("error occured try again later ", 404));
    }
    res.status(200).json(purchaseItem);
  } catch (error) {
    return next(new HttpError("Error occured try again later", 404));
  }
};

exports.postTshirt = postTshirt;
exports.getAllOrders = getAllOrders;
exports.changeParticularApproval = changeParticularApproval;
exports.getParticularPhoneNumber = getParticularPhoneNumber;

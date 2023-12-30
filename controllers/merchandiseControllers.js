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
  let purchaseItem;
  try {
    purchaseItem = await Purchase.findById(purchaseId);
    
    purchaseItem ={ ...purchaseItem , approved:true};

    await purchaseItem.save();

    if (purchaseItem) {
      return next(new HttpError("error occured try again  later", 404));
    }
    res.status(200).json({ msg: "approval done", purchaseItem });
  } catch (error) {
    return next(new HttpError("error occured try agin ", 404));
  }
};

const getParticularPurchaseId = async (req, res, next) => {
  let purchaseId = req.params.purchaseId;

  let purchaseItem;
  try {
    purchaseItem = await Purchase.findById(purchaseId);
    if (purchaseItem) {
      return next(new HttpError("error occures try again later ", 404));
    }
    res.status(200).json(purchaseItem);
  } catch (error) {
    return next(new HttpError("Error occured try again later", 404));
  }
};

exports.postTshirt = postTshirt;
exports.getAllOrders = getAllOrders;
exports.changeParticularApproval = changeParticularApproval;
exports.getParticularPurchaseId = getParticularPurchaseId;

const HttpError = require("../utils/HttpError");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../schemas/userSchema");

const MakeOrder = async (req, res, next) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const amount = req.body.amount;

    const options = {
      amount: amount,
      currency: "INR",
      receipt: "siddharth",
      notes: {
        notes_key_1: "Srijan Merchandise",
        notes_key_2: "Srijan",
      },
    };

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization:
          "Basic cnpwX2xpdmVfaENJYTI1emJ4MGljUlg6V0JoeFZJQmI2UGdvcGJCVHk5TktyT3Mx",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    let responseData = await response.json();
    res.json(responseData);
  } catch (err) {
    console.log(err);
    return next(new HttpError(err, 500));
  }
};

const ValidateOrderPayment = async (req, res, next) => {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return next(
      new HttpError(
        "Transaction failed , money will be refunded in 4-5 days if debited",
        400
      )
    );
  }

  const userId = req.userData.UserId;

  let response;
  try {
    response = await User.findById(userId);
  } catch (error) {
    return next(
      new HttpError(
        "Transaction failed , money will be refunded in 4-5 days if debited",
        400
      )
    );
  }



  let orderID = razorpay_order_id;
  let paymentID = razorpay_payment_id;
  let tshirtSize = req.body.tshirtSize;
  let quantity = req.body.quantity;
  let address = req.body.addresss;
  let type = req.body.type;


  response.Merchandise.push({
    tshirtSize: tshirtSize,
    address: address,
    quantity: quantity,
    orderID: orderID,
    paymentID: paymentID,
    type: type,
  });


  let userr;
  console.log(response);
  try {
    userr = await response.save();
  } catch {
    return next(new HttpError("Transaction failed ", 400));
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
};


const ValidateOrderPaymentOffer = async (req, res, next) => {
  console.log(req.body); 

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return next(
      new HttpError(
        "Transaction failed , money will be refunded in 4-5 days if debited",
        400
      )
    );
  }

  const userId = req.userData.UserId;
  let response;
  try {
    response = await User.findById(userId);
  } catch (error) {
    return next(
      new HttpError(
        "Transaction failed , money will be refunded in 4-5 days if debited",
        400
      )
    );
  }

  let orderID = razorpay_order_id;
  let paymentID = razorpay_payment_id;
  let tshirtSize1 = req.body.tshirtSize1;
  let tshirtSize2 = req.body.tshirtSize2;
  let tshirtSize3 = req.body.tshirtSize3;
  let tshirtSize4 = req.body.tshirtSize4;
  let hoodieSize1=req.body.hoodieSize1;
  let hoodieSize2 = req.body.hoodieSize2;
  let address = req.body.address;
  let type = req.body.type;

 
  if(type === "Tshirt"){
    response.Merchandise.push({
      tshirtSize: tshirtSize1,
      address: address,
      quantity: 1,
      orderID: orderID,
      paymentID: paymentID,
      type: type,
    });
    response.Merchandise.push({
      tshirtSize: tshirtSize2,
      address: address,
      quantity: 1,
      orderID: orderID,
      paymentID: paymentID,
      type: type,
    });
    response.Merchandise.push({
      tshirtSize: tshirtSize3,
      address: address,
      quantity: 1,
      orderID: orderID,
      paymentID: paymentID,
      type: type,
    });
    response.Merchandise.push({
      tshirtSize: tshirtSize4,
      address: address,
      quantity: 1,
      orderID: orderID,
      paymentID: paymentID,
      type: type,
    });
  }else if( type === "Hoodie"){
    response.Merchandise.push({
      tshirtSize: hoodieSize1,
      address: address,
      quantity: 1,
      orderID: orderID,
      paymentID: paymentID,
      type: type,
    });
    response.Merchandise.push({
      tshirtSize: hoodieSize2,
      address: address,
      quantity: 1,
      orderID: orderID,
      paymentID: paymentID,
      type: type,
    });

  }
  

  let userr;
  console.log(response);
  try {
    userr = await response.save();
  } catch {
    return next(new HttpError("Transaction failed ", 400));
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
};

const GenerateSignature = async (req, res, next) => {
  try {
    const { orderId, paymentId } = req.body;
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${orderId}|${paymentId}`);
    const digest = sha.digest("hex");
    res.json({ signature: digest });
  } catch (err) {
    return next(new HttpError("error", 500));
  }
};

exports.GenerateSignature = GenerateSignature;
exports.MakeOrder = MakeOrder;
exports.ValidateOrderPayment = ValidateOrderPayment;
exports.ValidateOfferOrderPayment = ValidateOrderPaymentOffer;

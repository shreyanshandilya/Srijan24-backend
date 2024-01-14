const HttpError = require("../utils/HttpError");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../schemas/userSchema");

const MakeOrder = async (req, res, next) => {
  try {
    const razorpay =  new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    });
    // const options = req.body;
    const options ={currency :"INR" , amount:1000 , receipt:"siddharth"}  

    console.log(options);
    const order = await razorpay.orders.create(options);
    console.log(order);
    if (!order) {
      return;
    }
    res.json(order);
  } catch (err) {
    console.log(err);
    return next(new HttpError(err, 500));
  }
};

const ValidateOrderPayment = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  console.log(req.body);
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
  console.log(userId);
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
  console.log(response);

  let orderID = razorpay_order_id;
  let paymentID = razorpay_payment_id;
  let tshirtSize = req.body.tshirtSize;
  let quantity = req.body.quantity;
  let address = req.body.addresss;

  response.Merchandise.push({
    tshirtSize: tshirtSize,
    address: address,
    quantity: quantity,
    orderID: orderID,
    paymentID: paymentID,
  });
  let userr;

  console.log(response);
  try {
    userr = await response.save();
  } catch {
    return next(
      new HttpError(
        "Transaction failed ",
        400
      )
    );
  }
  console.log(userr);

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
};

exports.MakeOrder = MakeOrder;
exports.ValidateOrderPayment = ValidateOrderPayment;

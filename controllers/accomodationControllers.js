const HttpError = require("../utils/HttpError");
const Accomodation = require("../schemas/accomodationSchema");
const User = require("../schemas/userSchema");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const AccomodationPaymentAndPurchase = async (req, res, next) => {
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

  let Pacakage = req.body.pacakage;

  if (Pacakage == "platinum") {
    response.IsProNight = true;
    response.IsEvents = true;
    response.Merchandise.push({
      tshirtSize: req.body.tshirtSize,
      address: req.body.address,
      quantity: 1,
      orderID: razorpay_order_id,
      paymentID: razorpay_payment_id,
      type: "Tshirt",
    });
  } else if (Pacakage == "gold") {
    response.IsEvents = true;
    response.Merchandise.push({
      tshirtSize: req.body.tshirtSize,
      address: req.body.address,
      quantity: 1,
      orderID: razorpay_order_id,
      paymentID: razorpay_payment_id,
      type: "Tshirt",
    });
  } else if (Pacakage == "silver") {
    response.IsEvents = true;
  } else if (Pacakage == "bronze") {
    response.IsProNight = true;
    response.IsEvents = true;
  }
  else if(Pacakage == "basic"){
     response.IsEvents =true;
     response.Merchandise.push({
      tshirtSize: req.body.tshirtSize,
      address: req.body.address,
      quantity: 1,
      orderID: razorpay_order_id,
      paymentID: razorpay_payment_id,
      type: "Tshirt",
    });
  }else if(Pacakage== "essential"){
    response.IsEvents ==true;
  }
  let Email = response.Email;

  try {
    response = await response.save();
  } catch (error) {
    return next(
      new HttpError(
        " error occured , try agin , money will be refunded later",
        404
      )
    );
  }
  console.log(response);
  let manav= Pacakage === "bronze" ? false : true ;
  let createAccomodation = new Accomodation({
    Email: Email,
    Pacakage: Pacakage,
    Idproof: req.body.Idproof,
    IsAccomodation: manav,
    HostleName: "To be Annouced",
    Gender: req.body.Gender,
    OrderId: razorpay_order_id,
    PaymentId: razorpay_payment_id,
  });

  let siddharth;
  try {
    siddharth = await createAccomodation.save();
  } catch (error) {
    return next(new HttpError("Error occured", 404));
  }
  console.log(siddharth);

  res.json({
    msg: "your Pacakage has Been Approved ",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
};

exports.AccomodationPaymentAndPurchase = AccomodationPaymentAndPurchase;

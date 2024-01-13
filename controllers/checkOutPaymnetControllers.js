const HttpError = require('../utils/Http-Error');
const Razorpay =require('razorpay');
const crypto =require('crypto');

const MakeOrder=  async (req, res ,next) => {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
      const options = req.body;
      const order = await razorpay.orders.create(options);
      if (!order) {
        return ;
      }
      res.json(order);
    } catch (err) {
      console.log(err);
      return next(new HttpError('Error' ,500));
    }
  }

 const ValidateOrderPayment =  async (req, res ,next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return next(new HttpError('Transaction failed , money will be refunded in 4-5 days if debited' ,400));
    }
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  };

  exports.MakeOrder=MakeOrder;
  exports.ValidateOrderPayment=ValidateOrderPayment;
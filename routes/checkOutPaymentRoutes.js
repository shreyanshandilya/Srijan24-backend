const express = require('express');
const router = express.Router();
const checkoutPaymentControllers= require('../controllers/checkOutPaymnetControllers');
const userAuthMiddleware= require('../middleware/check-auth');


router.post("/order",userAuthMiddleware, checkoutPaymentControllers.MakeOrder);  
router.post("/order/validate",userAuthMiddleware, checkoutPaymentControllers.ValidateOrderPayment);
router.post("/order/offer/validate",userAuthMiddleware, checkoutPaymentControllers.ValidateOfferOrderPayment);
router.post("/order/getSignature" ,userAuthMiddleware, checkoutPaymentControllers.GenerateSignature);

module.exports =router;
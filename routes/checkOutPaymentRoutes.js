const express = require('express');
const router = express.Router();
const checkoutPaymentControllers= require('../controllers/checkOutPaymnetControllers')

router.post("/order", checkoutPaymentControllers.MakeOrder);  
router.post("/order/validate", checkoutPaymentControllers.ValidateOrderPayment);

module.exports =router;
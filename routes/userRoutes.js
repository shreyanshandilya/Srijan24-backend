const express = require("express");
const router = express.Router();
const userControllers=require('../controllers/userControllers')
const userAuthMiddleware= require('../middleware/check-auth');
const otpControllers=require("../controllers/otpControllers");


router.post("/signup",otpControllers.sendOTP_signUP);
router.post("/signup/verify", otpControllers.verifyOTP_signUP);
router.post("/login" ,userControllers.login);

router.use(userAuthMiddleware);
router.post("/purchase"  ,userControllers.purchaseMerchandise);

module.exports = router;

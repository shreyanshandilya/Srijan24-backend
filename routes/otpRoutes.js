const express=require("express");
const router = express.Router();

const otpControllers=require("../controllers/otpControllers");

router.post("/sendOtp" ,otpControllers.sendOTP);
router.get("/verifyOtp" ,otpControllers.verifyOTP);

module.exports=router;

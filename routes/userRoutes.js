const express = require("express");
const router = express.Router();
const userControllers=require('../controllers/userControllers')
const userAuthMiddleware= require('../middleware/check-auth');
const otpControllers=require("../controllers/otpControllers");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });


router.post("/signup",otpControllers.sendOTP_signUP);
router.post("/signup/verify", otpControllers.verifyOTP_signUP);
router.post("/login" ,userControllers.login);
router.get("/getUser" ,userAuthMiddleware , userControllers.getUser);
router.get("/IAmHereToGetAllUsers", userControllers.getUsers )
// router.post("/purchase"  ,userAuthMiddleware ,  userControllers.purchaseMerchandise);

module.exports = router;

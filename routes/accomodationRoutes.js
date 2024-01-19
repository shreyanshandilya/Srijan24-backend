const express = require("express");
const router = express.Router();
const accomodationControllers = require("../controllers/accomodationControllers");
const userAuthMiddleware = require("../middleware/check-auth");

router.post("/user/pacakge", userAuthMiddleware, accomodationControllers.AccomodationPaymentAndPurchase);

module.exports = router;

const express = require("express");
const router = express.Router();

const notificationTokenControllers = require("../controllers/tokenControllers")

router.post("/tokens", notificationTokenControllers.addToken);
router.get("/tokens", notificationTokenControllers.getToken);

module.exports = router;
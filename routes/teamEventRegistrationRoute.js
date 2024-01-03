const express = require("express");
const router = express.Router();
const postEventRegistrationControllers = require("../controllers/teamEventRegistrationControllers");

router.post(
  "/eventRegitration",
  postEventRegistrationControllers.postEventRegistration
);
module.exports = router;

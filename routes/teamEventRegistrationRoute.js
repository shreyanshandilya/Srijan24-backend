const express = require("express");
const router = express.Router();
const postEventRegistrationControllers = require("../controllers/teamEventRegistrationControllers");

router.post(
  "/eventRegistration",
  postEventRegistrationControllers.postEventRegistration
);
module.exports = router;

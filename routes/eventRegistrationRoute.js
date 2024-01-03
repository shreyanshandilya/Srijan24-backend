const express = require("express");
const  router = express.Router();

const getEventRegistrationControllers = require("../controllers/eventRegistrationControllers");


router.get('/events/:id', getEventRegistrationControllers.getEventRegistration);

module.exports = router;
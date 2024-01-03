const express = require("express");
const bodyParser = require("body-parser");

const { postEventRegistration } = require("../controllers/teamEventRegistrationControllers");

const teamEventRegistrationRoute = express();

teamEventRegistrationRoute.use(express.json());
teamEventRegistrationRoute.use(bodyParser.urlencoded({ extended: true }));

teamEventRegistrationRoute.post('/eventRegitration', postEventRegistration);


module.exports = teamEventRegistrationRoute;
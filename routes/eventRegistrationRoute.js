const express = require("express");
const bodyParser = require("body-parser");

const { getEventRegistration} = require("../controllers/eventRegistrationControllers");

const eventRegistrationRoute = express();

eventRegistrationRoute.use(express.json());
eventRegistrationRoute.use(bodyParser.urlencoded({ extended: true }));

eventRegistrationRoute.get('/events/:id', getEventRegistration);

module.exports = eventRegistrationRoute;
const express = require('express');
const router = express.Router();
const userAuthMiddleware= require('../middleware/check-auth.js');
const teamControllers = require("../controllers/eventTeamRegistrationControllers.js");


router.post("/event/register",teamControllers.registerForEvent );  
router.get("/event/registeredEvents",teamControllers.getEventRegistration );

module.exports =router;
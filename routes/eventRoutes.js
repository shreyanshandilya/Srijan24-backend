const express = require('express');
const router = express.Router();
const eventControllers = require("../controllers/eventControllers");

router.get("/events", eventControllers.getEvents);

module.exports =router;
const express = require("express");
const router = express.Router()


const  eventControllers = require("../controllers/eventControllers");


router.get("/showAllEvents", eventControllers.getEvents);
router.get("/showEvents/:id",eventControllers.getSingleEvent);

module.exports = router;
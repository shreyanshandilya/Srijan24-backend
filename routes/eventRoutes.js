const express = require("express");
const router = express.Router()

const  eventControllers = require("../controllers/eventControllers");

router.post("/events/:zone" , eventControllers.getEventsByZone);
router.get("/events/:EventID" ,eventControllers.getParticularEvent);


module.exports = router;
const express = require("express");
const router = express.Router();

const announcementsControllers= require("../controllers/announcementControllers");



router.post('/announcements' , announcementsControllers.createAnnouncement );
router.get('/announcements', announcementsControllers.getAnnouncements);

module.exports=router;
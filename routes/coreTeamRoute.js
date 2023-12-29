const express = require("express");
const router = express.Router();

const coreTeamControllers = require('../controllers/coreTeamControllers');

router.get("/coreteam", coreTeamControllers.getCoreTeam);

module.exports = router;


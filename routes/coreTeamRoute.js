const express = require("express");
const bodyParser = require("body-parser");

const {getCoreTeam} = require('../controllers/coreTeam');
const { get } = require("mongoose");

const getTeamRoute = express();

getTeamRoute.use(express.json());
getTeamRoute.use(bodyParser.urlencoded({ extended: true }));

getTeamRoute.get("/coreteam", getCoreTeam);

module.exports = getTeamRoute;


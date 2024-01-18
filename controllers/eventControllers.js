const { EventData } = require("../assets/SrijanEvents");

const getEvents = (req, res, next) => {
    res.status(200).send(EventData);
}

exports.getEvents = getEvents;
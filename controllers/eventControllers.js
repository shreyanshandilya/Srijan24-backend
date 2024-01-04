const event = require("../schemas/eventSchema");
const HttpError = require("../utils/HttpError");

async function getEvents(req, res, next) {
  try {
    const allEvents = await event.find({});
    res.json(allEvents);
  } catch (error) {
    return next(new HttpError("error occured try again later", 400));
  }
}

async function getSingleEvent(req, res, next) {
  try {
    const eventId = req.params.id;
    const singleEvent = await event.find({ _id: eventId });
    if (!singleEvent) {
      return next(new HttpError("error occured try again later", 400));
    }
    res.json(singleEvent);
  } catch (error) {
    return next(new HttpError("error occured try again later"), 400);
  }
}

exports.getEvents = getEvents;
exports.getSingleEvent = getSingleEvent;

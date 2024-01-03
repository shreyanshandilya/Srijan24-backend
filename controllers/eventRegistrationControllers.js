const Event = require("../schemas/eventSchema");
const EventField = require("../schemas/eventRegistrationSchema");
const HttpError = require("../utils/HttpError");

async function getEventRegistration(req, res, next) {
  try {
    const eventID = req.params.id;
    const event = await Event.findById(eventID);
    const eventField = await EventField.findOne({ eventName: event.name });
    if (!event) {
      return next(new HttpError("event does not exist ", 400));
    }
    res.json(eventField);
  } catch (e) {
    return next(new HttpError("server error", 500));
  }
}

exports.getEventRegistration = getEventRegistration;

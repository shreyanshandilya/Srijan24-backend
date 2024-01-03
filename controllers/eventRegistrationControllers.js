const Event = require("../schemas/eventSchema");
const EventField = require("../schemas/eventRegistrationSchema");

exports.getEventRegistration = async (req, res) => {
    try {
        const eventID = req.params.id;
        const event = await Event.findById(eventID);
        const eventField = await EventField.findOne({ eventName: event.name });
        //console.log(event);
        if (event == null) {
            res.status(400).send({ meassage: "Event does not exits!" });
        }else res.status(200).send(eventField);
    } catch (e) {
        res.status(400).send({ message: e.message });
        return  res.status(500).send("Server Error") ;
    }
}
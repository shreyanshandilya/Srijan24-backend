const mongoose = require("mongoose");

const userEventsSchema = new mongoose.Schema({
    Email: {
        type: String,
        require: true

    },
    EventsRegistered: [
        {
            type: String
        }
    ]

});

module.exports = mongoose.model("UserEvents", userEventsSchema);
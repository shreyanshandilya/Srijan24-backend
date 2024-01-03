const mongoose = require("mongoose");
const teamEventRegistrationSchema = mongoose.Schema({
    teamName: {
        type: String,
    },
    teamLeader: {
        type: String,
    },
    eventName: {
        type: String,
    },
    member: [
        {
            name: {
                type: String,
            },
            email: {
                type: String,
            },
            phone: {
                type: String,
            },
            college: {
                type: String,
            },
            branch: {
                type: String,
            },
            yearOfStudy: {
                type: String,
            },
            admissionNumber: String,
        },
    ],
    stages: [
        {
            qualified: {
                type: Boolean,
                default: false,
            },
            attendance: {
                type: Boolean,
                default: false,
            },
        },
    ],
    problemStatement: {
        type: String,
    },
    fieldOfInterest: {
        type: String,
    },
    botWeight: {
        type: String,
    },
    driveLink: {
        type: String,
    },
});
module.exports = mongoose.model("EventRegistration", teamEventRegistrationSchema);

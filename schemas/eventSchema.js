const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  posterMobile: String, //image link
  posterWeb: String, // image link
  name: String,
  mode: String, // online , offline
  descriptionEvent: String, // description about event
  descriptionOrganizer: String, // description about Organizer
  type: Number, // 1=club event , 2= departmental event, 3=informal event
  organizer: String, // club name , department name
  rules: [String], // event rules
  registrationStatus: Number, //1=active ,2=inactive, 3=other plateform(unstop,googleForm, etc.)
  registrationLink: String,
  prizes: String, // 1 , 2 , 3 prize money
  contacts: [
    {
      name: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
    },
  ],
  fees: String, // paid or free event ( if paid then cost )
  pdfLink: String, // link of the rulebook pdf of event
  minTeamSize: Number,
  maxTeamSize: Number,
  problemStatements: String, // can be multiple
  extraDetails: [
    {
      key: {
        type: String,
        required: true,
      },
      value: {
        type: [String],
        required: true,
      },
    },
  ], // like bot details for robowars
  teams: [], // registered teams
  stages: [
    {
      description: {
        type: String,
        required: true,
      },
      venue: {
        type: String,
        required: true,
      },
      timing: {
        // start date and time
        type: String,
        required: true,
      },
      calenderLink: {
        // google calendar link
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);

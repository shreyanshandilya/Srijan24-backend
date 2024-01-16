const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  EventName: {
    type: String,
    required: true,
  },
  Zone: {
    type: String,
    required: true,
  },
  MiniDescription: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Venue: {
    type: String,
    required: true,
  },
  Fees: {
    type: String,
    required: true,
  },
  Contact: [
    {
      Name: {
        type: String,
        required: true,
      },
      PhoneNumber: {
        type: String,
        required: true,
      },
    },
  ],
  Rules: [{ type: String, required: true }],
  PosterURL: {
    type: String,
    required: true,
  },
  MinMenbers :{
    type :Number ,
    required :true,
  },
  MaxMembers :{
    type :Number ,
    required :true,
  }
});

module.exports = mongoose.model("Event", EventSchema);

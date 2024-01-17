const mongoose = require("mongoose");

const EventTeamListSchema = mongoose.Schema({
  events: {
    type: String,
    required: true,
  },
  teams: [
    {
      members: [
        {
          name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          phone: {
            type: String,
            required: true,
          },
          college: {
            type: String,
            required: true,
          },
          instrument: {
            type: String,
            default: null,
          },
        },
      ],
      teamName: {
        type: String,
        default: null,
      },
      sponsor: {
        type: Boolean,
        default: false,
      },
      audio: {
        type: String,
        default: null,
      },
      accompanist: {
        type: String,
        default: null,
      },
    },
  ],
});

module.exports = mongoose.model(
  "Dataforeventsregistration",
  EventTeamListSchema
);

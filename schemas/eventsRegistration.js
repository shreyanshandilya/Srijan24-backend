const mongoose = require("mongoose");

const EventTeamListSchema = mongoose.Schema({
  EventName: {
    type: String,
    required: true,
  },
  Teams: [
    {
      MembersList: [
        {
          Name: {
            type: String,
            required: true,
          },
          Email: {
            type: String,
            required: true,
          },
          PhoneNumber: {
            type: String,
            required: true,
          },
          College: {
            type: String,
            required: true,
          },
          Instrument: {
            type: String,
            default: null,
          },
        },
      ],
      TeamName: {
        type: String,
        default: null,
      },
      IsSponsor: {
        type: Boolean,
        default: false,
      },
      Audio: {
        type: String,
        default: null,
      },
      Accompanist: {
        type: String,
        default: null,
      },
      ReferralID:{
        type: String,
        default:null,
      },
      Genre:{
        type:[String],
        default:null
      },
      Round1Preference:{
        type:String,
        default:null
      }
    },
  ],
});

module.exports = mongoose.model(
  "EventsData",
  EventTeamListSchema
);

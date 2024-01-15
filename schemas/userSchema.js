const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otp_expiry_time: {
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  Merchandise: [
    {
      tshirtSize: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      orderID: {
        type: String,
        required: true,
      },
      paymentID: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      }
    }
  ],
  IsISM: { type: Boolean, required: true },
  IsProNight: { type: Boolean, required: true },
  IsEvents: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", userSchema);

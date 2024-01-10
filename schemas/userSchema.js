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
      imageURL: {
        type: String,
        required: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  IsISM: { type: Boolean, required: true },
  IsProNight:{type:Boolean , required:true},
  IsEvents:{type:Boolean ,required:true}
});

module.exports = mongoose.model("User", userSchema);

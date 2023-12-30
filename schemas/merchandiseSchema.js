const mongoose = require("mongoose");
const purchaseTshirtSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admissionNumber: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    tshirtSize: {
      type: String,
      required: true,
    },
    hostel: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    approved:{
      type:Boolean,
      required :true
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Purchase", purchaseTshirtSchema);

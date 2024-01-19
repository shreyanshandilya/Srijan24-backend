const mongoose = require("mongoose");

const AccomodationSchema = new mongoose.Schema({
    Email: {
        type: String,
        require: true
    },
    Pacakage:{
        type :String,
        required :true,
    },
    Idproof:{
        type :String,
        required :true
    },
    IsAccomodation :{
        type :Boolean,
        required :true
    },
    HostleName:{
        type :String,
        required :true,
        default : "TO BE ANNOUNCED"
    },
    Gender:{
         type :String,
         required :true,
    },
    PaymentId :{
        type :String,
        required :true,
    },
    OrderId :{  
        type :String,
        required :true,
    }
   
});

module.exports = mongoose.model("Accomodation",AccomodationSchema);
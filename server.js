const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// import chalk from "chalk";
const cors = require("cors");
const HttpError = require("./utils/HttpError");
require("dotenv").config();


//ROUTES IMPORT
const PurchaseRoute = require("./routes/merchandiseRoute");
const getTeamRoute = require("./routes/coreTeamRoute");
const teamEventRegistrationRoute = require("./routes/teamEventRegistrationRoute");
const eventRegistrationRoute = require("./routes/eventRegistrationRoute");
const eventRoute = require("./routes/eventRoutes");
const announcementRoute=require("./routes/announcementRoutes");
const userRoute=require("./routes/userRoutes")
const otpRoute=require('./routes/otpRoutes');
const tokenRoute=require("./routes/tokenRoutes");

const app = express();
const path = require('path');
// const router = express.Router()

app.use(bodyParser.json());
app.use(cors());

//DATABASE CONNECTION
const DB_URL = process.env.DB_URL;

async function main() {
  try {
    await mongoose.connect(DB_URL).then(() => { console.log("connected to database"); })

  } catch (err) {
    console.log(err);
    console.log("error connecting to database")
  };
}
main()

//ROUTES
app.use("/api", PurchaseRoute);
app.use("/api", getTeamRoute);
app.use("/api", eventRegistrationRoute);
app.use("/api",teamEventRegistrationRoute);
app.use("/api", eventRoute);
app.use("/api",announcementRoute);
app.use("/api", userRoute);
app.use("/api", otpRoute);
app.use("/api", tokenRoute);

app.get('/', (req, res) => {
  res.send('test');
})
const PORT = process.env.PORT || 2000;

app.use((req, res, next) => next (new HttpError('Could not find this route.', 404)));

app.use((error, req, res, next) => {1
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
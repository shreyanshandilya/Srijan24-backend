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

const app = express();
const path =require('path');
// const router = express.Router()

app.use(bodyParser.json());
app.use(cors());

//DATABASE CONNECTION
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/srijan2024";

main().catch(err => console.log("error connecting to database"));
async function main() {
  await mongoose.connect(DB_URL);
  console.log("connected to database");
}

//ROUTES
app.use("/api", PurchaseRoute);
app.use("/api", getTeamRoute)

const PORT = process.env.PORT || 2000;

app.use((req, res, next) => next (new HttpError('Could not find this route.', 404)));

app.use((error, req, res, next) => {1
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
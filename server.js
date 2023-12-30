const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// import chalk from "chalk";
const cors = require("cors");
const ExpressError = require("./utils/expressError");
require("dotenv").config();


//ROUTES IMPORT
const PurchaseRoute = require("./routes/merchRoute");
const getTeamRoute = require("./routes/coreTeamRoute");

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
app.use("/api", getTeamRoute)

app.get('/', (req, res) => {
  res.send('test');
})
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
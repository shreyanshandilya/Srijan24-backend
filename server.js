const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const HttpError = require("./utils/HttpError");
const cors = require('cors');
require("dotenv").config();


//ROUTES IMPORT
const getTeamRoute = require("./routes/coreTeamRoute");
const teamEventRegistrationRoute = require("./routes/teamEventRegistrationRoute");
const eventRegistrationRoute = require("./routes/eventRegistrationRoute");
const eventRoute = require("./routes/eventRoutes");
const announcementRoute = require("./routes/announcementRoutes");
const userRoute = require("./routes/userRoutes")
const tokenRoute = require("./routes/tokenRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
  credentials: true
}));

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

//headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
  next();
});
//ROUTES
app.use("/api", getTeamRoute);
app.use("/api", eventRegistrationRoute);
app.use("/api", teamEventRegistrationRoute);
app.use("/api", eventRoute);
app.use("/api", announcementRoute);
app.use("/api", userRoute);
app.use("/api", tokenRoute);

app.get('/', (req, res) => {
  res.send('test');
})
const PORT = process.env.PORT || 2000;

app.use((req, res, next) => next(new HttpError('Could not find this route.', 404)));

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const HttpError = require("./utils/HttpError");
const cors = require('cors');
require("dotenv").config();

//ROUTES IMPORT;
const announcementRoute = require("./routes/announcementRoutes");
const userRoute = require("./routes/userRoutes");
const tokenRoute = require("./routes/tokenRoutes");
const checkOutPaymentRoute= require("./routes/checkOutPaymentRoutes");
const eventTeamRegistrationRoutes= require("./routes/eventTeamRegistrationRoutes");

const app = express();
app.use(cors({
  origin: '*',
  methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(bodyParser.json());

const DB_URL = process.env.DB_URL;
async function main() {
  try {
    await mongoose.connect(DB_URL).then(() => {
      console.log("connected to database");
    });
  } catch (err) {
    console.log(err);
    console.log("error connecting to database");
  }
}
main();


app.use("/api", announcementRoute);
app.use("/api", tokenRoute);
app.use("/api", userRoute);
app.use("/api" , checkOutPaymentRoute);
app.use("/api" , eventTeamRegistrationRoutes);

app.get("/", (req, res) => {
  res.send("test");
});
const PORT = process.env.PORT || 2000;

app.use((req, res, next) =>
  next(new HttpError("Could not find this route.", 404))
);

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

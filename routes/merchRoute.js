
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
const catchAsync = require("../utils/catchAsync");

const { postTshirt } = require("../controllers/merch");

const purchaseRoute = express();

purchaseRoute.use(express.json());
purchaseRoute.use(bodyParser.urlencoded({ extended: true }));

purchaseRoute.post("/purchase", upload.single("image"), catchAsync(postTshirt));

module.exports = purchaseRoute;
   
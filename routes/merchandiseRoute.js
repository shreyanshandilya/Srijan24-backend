const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

const merchandiseControllers  = require("../controllers/merchandiseControllers");

router.post("/purchase", upload.single("image"), merchandiseControllers.postTshirt);
router.get('/allOrders' ,merchandiseControllers.getAllOrders);
router.post('/changeApproved/:purchaseId' , merchandiseControllers.changeParticularApproval);
router.post('/getOrder/:purchaseId',merchandiseControllers.getParticularPurchaseId);

module.exports = router;
   
const express = require("express");
const router = express.Router();

// استدعاء الدوال من الـ Controller
const { 
    createKitchen, 
    getAllKitchens, 
    getKitchenDetails 
} = require("../controllers/kitchenController");


router.get("/", getAllKitchens);


router.get("/:id", getKitchenDetails);


router.post("/", createKitchen);

module.exports = router;
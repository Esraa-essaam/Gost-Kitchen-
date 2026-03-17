const express = require("express");
const router = express.Router();

const { 
    createuser, 
    updateuser, 
    getuserdata, 
    deleteuser 
} = require("./controllers/userController");


router.get("/getuserdata/:id", getuserdata);
router.put("/updateuser/:id", updateuser);
router.delete("/deleteuser/:id", deleteuser);

module.exports = router;
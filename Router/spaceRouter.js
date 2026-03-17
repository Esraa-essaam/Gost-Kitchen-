const express = require ("express");
const router = express.Router();

const {addPlace,userSearch,deletePlace} =require ("../controllers/spaceController");

router.post("/addPlace",addPlace);
router.get("/userSearch",userSearch);
router.delete("/deletePlace",deletePlace);

module.exports= router;
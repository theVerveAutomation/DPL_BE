const express = require("express");
const router = express.Router();
const mapController = require("../controllers/mapcontroller");

router.get("/list", mapController.getMapList);
router.get("/grid/:map", mapController.getMapGrid);
router.get("/stations/:map", mapController.getStations);
router.post("/pull", mapController.pullMap);


module.exports = router;

const express = require("express");

const router = express.Router();
const controllers = require("../controllers/bikeController");

router.get("/", controllers.getAllBikes);
router.get("/:service_id", controllers.getAllBikesFromRentalServices);
router.post("/", controllers.postBikesForRentalService);
router.get("/bike/:id", controllers.getBikeFromBikeId);

module.exports = router;

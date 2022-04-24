const express = require("express");
const router = express.Router();

const controllers = require("../controllers/rentController");

router.get("/", controllers.getAllRentsServices);
router.get("/:location_name", controllers.getRentServicesFromLocation);
router.post("/", controllers.postRentServices);

module.exports = router;

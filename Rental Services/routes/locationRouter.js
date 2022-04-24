const express = require("express");

const router = express.Router();
const controllers = require("../controllers/locationController");
const verify = require("../middlewares/verifyToken");

router.get("/", controllers.getAllLocation);
router.post("/", controllers.postLocation);

router.get("/:location_name", controllers.getLocation);

module.exports = router;

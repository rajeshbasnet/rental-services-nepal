const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userController");

router.post("/user", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.get("/user/:id", controllers.getUser);
router.put("/user", controllers.updateUser);

module.exports = router;

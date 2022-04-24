const express = require("express");
const router = express.Router();
const controllers = require("../controllers/commentController");

router.get("/", controllers.getAllComments);
router.delete("/:id", controllers.deleteComments);
router.post("/", controllers.postComments);

module.exports = router;

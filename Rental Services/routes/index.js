const express = require("express");
const router = express.Router();
const rentRouter = require("./rentRouter");
const locationRouter = require("./locationRouter");
const bikeRouter = require("./bikeRouter");
const userRouter = require("./userRouter");
const commentRouter = require("./commentRouter");
const orderRouter = require("./orderRouter");

router.use("/location", locationRouter);
router.use("/services", rentRouter);
router.use("/bikes", bikeRouter);
router.use("/comments", commentRouter);
router.use("/orders", orderRouter);
router.use(userRouter);

module.exports = router;

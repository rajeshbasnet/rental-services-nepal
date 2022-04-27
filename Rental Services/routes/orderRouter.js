const express = require("express");
const router = express.Router();
const controllers = require("../controllers/orderController");

router.get("/", controllers.getAllOrders);
router.get("/:user_id", controllers.getOrdersFromUserId);
router.post("/", controllers.postOrder);
router.delete("/:order_id", controllers.clearSingleOrderFromOrderId);
router.put("/", controllers.updatePaymentFromOrders);

module.exports = router;

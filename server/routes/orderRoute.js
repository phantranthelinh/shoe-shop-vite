const express = require("express");

const router = express.Router();
const orderController = require("../controllers/OrderController");
const { protect, admin } = require("../middleware/AuthMiddleware");
router.post("/", protect, orderController.create);
router.get("/all", protect, admin, orderController.adminGetAllOrder);
router.get("/pending", protect, admin, orderController.getPendingOrder);
router.get("/:id", protect, orderController.detail);
router.put("/:id", protect, orderController.update);
router.put("/:id/order-status", protect, orderController.updateOrderStatus);
router.get("/", protect, orderController.getOrderByUser);

router.delete("/", protect, admin, orderController.deleteAllOrder);

router.delete("/:id", protect, admin, orderController.deleteOrder);

module.exports = router;

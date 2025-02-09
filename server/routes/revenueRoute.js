const express = require("express");

const router = express.Router();
const revenueController = require("../controllers/RevenueController");
const { protect, admin } = require("../middleware/AuthMiddleware");
router.get("/chart", protect, admin, revenueController.getDataChartRevenue);
router.get(
  "/chart-monthly",
  protect,
  admin,
  revenueController.getDataChartRevenueMonthly
);

module.exports = router;

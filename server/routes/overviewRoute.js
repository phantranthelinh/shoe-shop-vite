const express = require("express");

const router = express.Router();
const overviewController = require("../controllers/OverviewController");
const { protect, admin } = require("../middleware/AuthMiddleware");
router.get("/", protect, admin, overviewController.getOverview);

module.exports = router;

const express = require("express");

const router = express.Router();
const imageController = require("../controllers/ImageController");
const { protect, admin } = require("../middleware/AuthMiddleware");
router.post("/", protect, admin, imageController.create);

module.exports = router;

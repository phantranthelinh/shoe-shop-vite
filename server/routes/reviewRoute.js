const express = require("express");

const router = express.Router();
const ReviewController = require("../controllers/ReviewController");
const { protect } = require("../middleware/AuthMiddleware");
router.post("/:productSlug", protect, ReviewController.addReview);
router.get("/:productSlug", ReviewController.getReviewsByProductSlug);

module.exports = router;

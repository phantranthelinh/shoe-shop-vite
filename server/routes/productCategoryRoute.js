const express = require("express");

const router = express.Router();
const { protect, admin } = require("../middleware/AuthMiddleware");
const ProductCategoryController = require("../controllers/ProductCategoryController");
router.post("/", ProductCategoryController.addCategory);
router.put("/:id", ProductCategoryController.editCategory);
router.get("/:id", protect, ProductCategoryController.getCategory);
router.get("/", protect, admin, ProductCategoryController.getCategories);

router.delete("/profile", protect, ProductCategoryController.deleteCategory);

module.exports = router;

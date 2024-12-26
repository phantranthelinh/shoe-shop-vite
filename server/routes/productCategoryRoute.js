const express = require("express");

const router = express.Router();
const { protect, admin } = require("../middleware/AuthMiddleware");
const ProductCategoryController = require("../controllers/ProductCategoryController");
router.post("/", protect, admin, ProductCategoryController.addCategory);
router.put("/:id", protect, admin, ProductCategoryController.editCategory);
router.get("/:id", ProductCategoryController.getCategory);
router.get("/", ProductCategoryController.getCategories);

router.delete("/:id", protect, admin, ProductCategoryController.deleteCategory);

module.exports = router;

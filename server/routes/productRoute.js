const express = require("express");
const { protect, admin } = require("../middleware/AuthMiddleware");

const router = express.Router();

const ProductController = require("../controllers/ProductController");
router.get("/all", protect, admin, ProductController.getAllProductsByAdmin);
router.get("/:slug", ProductController.getProductBySlug);
router.get("/related/:slug", ProductController.getRelatedProducts);
router.get("/category/:slug", ProductController.getProductByCategorySlug);

router.get("/:id", ProductController.getAProduct);

router.delete("/:id", protect, admin, ProductController.deleteProduct);
router.put("/:id", protect, admin, ProductController.editProduct);
router.post("/", protect, admin, ProductController.addProduct);

router.get("/", ProductController.getAllProducts);

module.exports = router;

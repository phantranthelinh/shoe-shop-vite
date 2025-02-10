const express = require("express");

const router = express.Router();
const userController = require("../controllers/UserController");
const { protect, admin } = require("../middleware/AuthMiddleware");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", protect, userController.profile);
router.get("/", protect, admin, userController.getAllUsers);

router.put("/profile", protect, userController.updateProfile);
router.get("/address", protect, userController.getAddress);
router.delete("/address/:id", protect, userController.deleteAddress);
router.put("/address/:id", protect, userController.updateAddress);
router.post("/address", protect, userController.addAddress);

router.get("/address", protect, userController.getAddress);

module.exports = router;

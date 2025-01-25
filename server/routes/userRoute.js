const express = require("express");

const router = express.Router();
const userController = require("../controllers/UserController");
const { protect, admin } = require("../middleware/AuthMiddleware");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", protect, userController.profile);
router.get("/", protect, admin, userController.getAllUsers);

router.put("/:id/profile", protect, userController.updateProfile);

module.exports = router;

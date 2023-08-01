const express = require("express");
const router = express.Router();
const { auth, isValidUser, uploadMiddleware } = require("../../middlewares");
const {
  registration,
  login,
  logout,
  getCurrentUser,
  changeSubscription,
  updateAvatar,
} = require("../../controllers");

router.post("/registration", isValidUser, registration);
router.post("/login", isValidUser, login);
router.post("/logout", auth, logout);
router.get("/current", auth, getCurrentUser);
router.patch("/subscription", auth, changeSubscription);
router.patch("/avatars", auth, uploadMiddleware.single("avatar"), updateAvatar)

module.exports = router;
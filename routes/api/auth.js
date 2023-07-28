const express = require("express");
const router = express.Router();
const { auth, isValidUser } = require("../../middlewares");
const {
  registration,
  login,
  logout,
  getCurrentUser,
  changeSubscription,
} = require("../../controllers");

router.post("/registration", isValidUser, registration);
router.post("/login", isValidUser, login);
router.post("/logout", auth, logout);
router.get("/current", auth, getCurrentUser);
router.patch("/subscription", auth, changeSubscription);

module.exports = router;
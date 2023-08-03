const express = require("express");
const router = express.Router();

const { auth, isValidUser, uploadMiddleware, isValidUserEmail  } = require("../../middlewares");

const {
  registration,
  login,
  logout,
  getCurrentUser,
  changeSubscription,
  updateAvatar,
  verifyUser, 
  additionalVerifyUser
} = require("../../controllers");

router.post("/registration", isValidUser, registration);
router.post("/login", isValidUser, login);
router.post("/logout", auth, logout);
router.get("/current", auth, getCurrentUser);
router.patch("/subscription", auth, changeSubscription);
router.patch("/avatars", auth, uploadMiddleware.single("avatar"), updateAvatar)
router.get("/verify/:verificationToken", verifyUser)
router.post("/verify", isValidUserEmail, additionalVerifyUser)



module.exports = router;
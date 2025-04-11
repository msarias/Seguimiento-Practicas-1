const express = require("express");
const router = express.Router();
const { forgotPassword, resetPassword,login } = require("../Controllers/authController");

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", (req, res) =>
    resetPassword(req, res, req.app.get("io"))
  );
  router.post("/login",login);

module.exports = router;

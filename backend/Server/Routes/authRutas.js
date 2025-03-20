const express = require("express");
const router = expres.Router();
const {forgotPassword, resetPassword} = require("../Controllers/authController");

router.post("/forgot-password", forgotPassword);
router.post("(reset-password/:token", resetPassword);

module.exports = router;
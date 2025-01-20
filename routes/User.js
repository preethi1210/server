const express = require('express');
const router = express.Router();

// Define routes for users
const {login,signup,sendotp,changePassword,}=require("../controllers/Auth")
const {resetPasswordToken,resetPassword}=require("../controllers/ResetPassword")

const {auth}=require("../middlewares/auth")
router.post("/login",login)
router.post("/signup",signup)
router.post("/sendotp",sendotp)
router.post("/changepassword",changePassword)
router.post("/reset-password-token",resetPasswordToken)
router.post("/reset-password",resetPassword)

module.exports = router;

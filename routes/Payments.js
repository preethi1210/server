const express = require('express');
const router = express.Router();
const {verifySignature,capturePayment}=require("../controllers/Payments")
const {auth, isStudent}=require("../middlewares/auth")

router.post("/verifySignature",auth,isStudent,verifySignature)
router.post("/capturePayment",capturePayment)

module.exports = router;

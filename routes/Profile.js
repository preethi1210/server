const express = require('express');
const router = express.Router();
const {auth}=require("../middlewares/auth")
const {deleteAccount,updateProfile,getAllUserDetails}=require("../controllers/Profile")
// Define routes for user profiles
router.delete("/deleteProfile",deleteAccount)
router.put("updateProfile",auth,updateProfile)
router.get("/getUserDetails",auth,getAllUserDetails)
module.exports = router;

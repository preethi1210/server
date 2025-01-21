const express = require('express');
const router = express.Router();

// Define routes for users
const {getAverageRating,createRating,getAllRating}=require("../controllers/RatingAndReview")

const {auth, isStudent}=require("../middlewares/auth")
router.post("/createRating",auth,isStudent,createRating)
router.post("/getAverageRating",getAverageRating)
router.post("/getReviews",getAllRating)
module.exports = router;

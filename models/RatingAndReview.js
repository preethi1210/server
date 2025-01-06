const mongoose=require("mongoose");
const ratingAndReviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    },
    courses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
index:true,     
    }
})
module.exports=mongoose.model("RatingAndReview",ratingAndReviewSchema);
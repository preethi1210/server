const RatingAndReview=require("../models/RatingAndReview")
const Course=require("../models/Course")
exports.createRating=async(req,res)=>{
try{
    const userId=req.user.id;
    const {rating,review,courseId}=req.body;
    const courseDetails=await Course.findOne({_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}},})
    if (!courseDetails) {
        return res.status(404).json({
            success: false,
            message: 'Student not enrolled in the course.',
        });
    }
    const alreadyReviewed=await RatingAndReview.findOne({user:userId,course:courseId,})
    if (alreadyReviewed) {
        return res.status(404).json({
            success: false,
            message: 'Course is already revied by the user.',
        });
    }
    const ratingReview=await RatingAndReview.create({rating,review,course:courseId,user:userId})
    const updatedCourseDetails= await Course.findByIdAndUpdate({_id:courseId},{$push:{ratingAndReviews:ratingReview._id}},{new:true})
    console.log(updatedCourseDetails);
    return res.status(200).json({
        success: true,
        message: 'Rating and review created successfully',
    });
}
catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: 'Error in creating rating.',
    });
}
}
exports.getAverageRating=async(req,res)=>{
    try{
        const courseId=req.body.courseId;
        const result=await RatingAndReview.aggregate([{
            $match:{course:new mongoose.Types.ObjectId(courseId)}
        },{$group:{_id:null,averageRating:{$avg:"$rating"}}}])
        if(result.length>0){
            return res.status(200).json({
                success: true,
                message:"No rating till now avg is 0",
                averageRating:0,
            });  
        }
        return res.status(200).json({
            success: true,
            averageRating:result[0].averageRating
        }); 
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting avg rating.',
        });
    }
}
exports.getAllRating=async(req,res)=>{
try{
    const allReviews=await RatingAndReview.find({}).sort({rating:{desc}}).populate({path:"user",
select:"firstName lastName email image"}).populate({path:"course",select:"courseName"}).exec();
return res.status(200).json({
    success: true,
    message:"All reviews fetched successfully",
    data:allReviews
}); 
}
catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: 'Error in getting all ratings.',
    });
}
}

const {instance}=require("../config/razorpay")
const Course=require("../models/Course")
const User=require("../models/User")
const mailSender=require("../utils/mailSender")
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail")
const { default: mongoose } = require("mongoose")
exports.capturePayment=async(req,res)=>{
    const {course_id}=req.body;
    const userId=req.user.id;
    if(!course_id){
        return res.json({
            success: false,
            message: 'Please provide valid ID .',
        });
    }
    let course;
    try{
         course=await Course.findById(course_id);
         if(!course){
            return res.json({
                success: false,
                message: 'Could not find Id .'});
         }
         const uid=new mongoose.Types.ObjectId(userId);
         if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success: false,
                message: 'Student has already registered',
            });
         }


    }
    catch(error){
        return res.status(500).json({
            success: false,
            message:error.message,
        });
    }
    const amount=course.price;
    const currency="INR";
    const options={
       amount:amount*100,currency,
       receipt:Math.random(Date.now()).toString(),
       notes:{
           courseId:course_id,
           userId,
       }
    }
    try{
        const paymentResponse=await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            success: true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Could not initiate order",
        });
    }
}
exports.verifySignature=async(req,res)=>{
    const webhooksecret="12345678";
    const signature=req.headers["x-razorpay-signature"];
    const shasum=crypto.createHmac("sha256",webhooksecret);
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest("hex");
    if(digest===signature){
        console.log("payment is authorised");
        const {courseId,userId}=req.body.payload.payment.entity.notes;
        try{
            const enrolledCourse=await Course.findByIdAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true})
            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    message:"Course not found",
                }); 
            }
            console.log(enrolledCourse);
            const enrolledStudent=await Course.findByIdAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true})
            console.log(enrolledStudent);
            const emailResponse=await mailSender(enrolledStudent.email,"Congratulations from CodeHelp","Congratulations, you onboarded on new CodeHelp course ")
            console.log(emailResponse);
            return res.status(200).json({
                success: true,
                message:"Signature verified and course added",
            });

        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message:"Could not initiate order",
            });
        }
    }
    else{
        return res.status(400).json({
            success: false,
            message:"Invalid request",
        });
    }
}
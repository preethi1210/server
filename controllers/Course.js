const Course=require("../models/Course");
const Tag=require("../models/Tag");
const User=require("../models/User");
const uploadImagetoCloudinary=require("../utils/imageUploader");
exports.createCourse=async(req,res)=>{
    try{
        const {courseName,courseDescription,whatYouWillLearn,price,tag}=req.body;
        const thumbnail=req.files.thumbnailImage;
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);
        console.log("instructorDetails : ",instructorDetails);
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor details not found',
            })
        }
        const tagDetails=await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:'Tag details not found',
            })
        }
        const thumbnailImage=await uploadImagetoCloudinary(thumbnail,process.env.FOLDER_NAME) ;

    }
    catch(error){

    }
}
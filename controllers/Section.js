const Section=require("../models/Section");
const Course=require("../models/Course");
exports.createSection=async (req,res)=>{
    try{
        const {sectionName,courseId}=req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'Enter all fields',
            })  
        }
        const newSection=await Section.create({sectionName})
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            { $push: { courseContent: newSection._id } },
            { new: true }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSections", 
            },
        });

        // Respond with updated course details
        return res.status(200).json({
            success: true,
            message: "Section created and course updated successfully",
            data: updatedCourseDetails,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error in creating section',
        })
}
}
exports.updateSection=async(req,res)=>{
    try{
        const {sectionName,sectionId}=req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'Enter all fields',
            })  
        }
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: updatedCourseDetails,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error in updating section',
        })
}
}

exports.deleteSection=async(req,res)=>{
    try{
        const { sectionId } = req.params;

        const deletedSection = await Section.findByIdAndDelete(sectionId);

        if (!deletedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error in deleting section',
        })
}
}
 
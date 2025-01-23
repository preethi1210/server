const User=require('../models/User');
const Profile=require('../models/Profile');
exports.updateProfile=async(req,res)=>{
    try{
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;
        const {id}=req.user.id;
if(!id || !contactNumber || !gender){
    return res.status(400).json({
        success:false,
        message:'Enter all fields',
    }) 
}
const userDetails=await User.findById(id);
const profileId=userDetails.additionalDetails;
const profileDetails=await Profile.findById(profileId);
profileDetails.dateOfBirth=dateOfBirth;
profileDetails.about=about;
profileDetails.gender=gender;
profileDetails.contactNumber=contactNumber;
await profileDetails.save();
return res.status(200).json({
    success: true,
    message: "profileDetails updated successfully",
    data: updatedCourseDetails,
});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in updating  profile",
        });
    }
}
exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.user;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required.',
            });
        }

        // Fetch user details
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        // Fetch profile ID from user details
        const profileId = userDetails.additionalDetails;

        // Delete profile
        await Profile.findByIdAndDelete({_id:profileId});

        // Delete user
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success: true,
            message: 'Account deleted successfully.',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in deleting account.',
        });
    }
};
exports.getAllUserDetails = async (req, res) => {
    try {
        const  id  = req.user.id;

        const userDetails = await User.findById(id)
            .populate("additionalDetails").exec();
        return res.status(200).json({
            success: true,
            message: 'User details fetched successfully.',
            data: users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in fetching user details.',
        });
    }
};
exports.updateDisplayPicture = async (req, res) => {
    try {
        const { displayPicture } = req.body;
        const { id } = req.user;

        if (!displayPicture) {
            return res.status(400).json({
                success: false,
                message: 'Display picture URL is required.',
            });
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        
        profileDetails.displayPicture = displayPicture;
        await profileDetails.save();

        return res.status(200).json({
            success: true,
            message: 'Display picture updated successfully.',
            data: profileDetails,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in updating display picture.',
        });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const { id } = req.user;
        const userDetails = await User.findById(id).populate("enrolledCourses").exec();

        return res.status(200).json({
            success: true,
            message: 'Enrolled courses fetched successfully.',
            data: userDetails.enrolledCourses,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error in fetching enrolled courses.',
        });
    }
};

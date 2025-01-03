const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, timeDuration, description } = req.body;
        const video = req.files.videoFile;

        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        const updateSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { SubSection: subSectionDetails._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Sub Section created successfully",
            data: updateSection,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating sub section",
        });
    }
};

exports.updateSubSection = async (req, res) => {
    try {
        const { subSectionId, title, timeDuration, description } = req.body;
        const video = req.files?.videoFile;

        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID is required",
            });
        }

        const subSectionDetails = await SubSection.findById(subSectionId);
        if (!subSectionDetails) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        if (video) {
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSectionDetails.videoUrl = uploadDetails.secure_url;
        }

        if (title) subSectionDetails.title = title;
        if (timeDuration) subSectionDetails.timeDuration = timeDuration;
        if (description) subSectionDetails.description = description;

        await subSectionDetails.save();

        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data: subSectionDetails,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in updating sub section",
        });
    }
};

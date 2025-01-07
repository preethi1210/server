const Category=require("../models/Course")
exports.createCategory = async (req, res) => {
    try {
      const { name, description } = req.body;
  
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Category name is required",
        });
      }
  
      const category = new Category({ name, description });
      await category.save();
  
      return res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  exports.showAllCategories = async (req, res) => {
    try {
      const categories = await Category.find().populate("courses").exec();
  
      return res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  
exports.categoryPageDetails=async(req,res)=>{
try{const {categoryId}=req.body;
const selectedCategory=await Category.findById(categoryId).populate("courses").exec();
if(!selectedCategory){
    return res.status(404).json({
        success:false,
        message:`Data not found`,
    })
}
const differentCategories=await Category.find({_id:{$ne:categoryId}}).populate("courses").exec();
return res.status(200).json({
    success:true,
    data:{selectedCategory,differentCategories}
})
}
catch(error){
    return res.status(500).json({
        success:false,
        message:error.message,
    })
}
}
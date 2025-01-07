const mongoose=require("mongoose");
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        requires:true,
    },
    decription:{type:String,
    },
    courses:[{type:mongoose.Schema.Types.ObjectId,ref:"Course"},],
})
mongoose.exports=mongoose.model("Category",categorySchema);
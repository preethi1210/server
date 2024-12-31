const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require('bcrypt');
exports.resetPasswordToken=async (req,res)=>{
    try{
    const email=req.body.email;
    const user=await User.findOne({email:email});
    if(!user){
        return res.json({
            sucess:false,message:'Your email is not registered'
        })
    }
    const token=crypto.randomUUID();
    const updatedDetails=await User.findOneAndUpdate({email:email},{token:token},{resetPasswordExpires:Date.now()+5*60*1000},{new:true});

    const url=`http://localhost:3000/update-password/${token}`;

await mailSender(email,"Password reset link",`Password reset link:${url}`)
return res.json({
    sucess:true,message:'Email sent sucessfully.Please check email and change password',
})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            sucess:false,message:'Something went wrong while resetting password',
        })
    }
}
exports.resetPassword=async(req,res)=>{
    try{
const {password,confirmPassword,token}=req.body;
if(password!==confirmPassword){
    return res.json({
        success:false,
        message:'Password and confirm password are not matched , please try again',
    })
}
const userDetails=await User.findOne({token:token});
if(!userDetails){
    return res.json({
        success:false,
        message:'Token is invalid, please try again',
    })
}
if(userDetails.resetPasswordExpires<Date.now()){
    return res.json({
        success:false,
        message:'Token is expired, please try again',
    })
}
const hashedPassword=await bcrypt.hash(password,10);
await User.findOneAndUpdate(
    {token:token},
    {password:hashedPassword},
    {new:true},
)
return res.status(200).json({
    success:true,
    message:'Password generated successfully',
})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            sucess:false,message:'Something went wrong while resetting password',
        })
    }
}
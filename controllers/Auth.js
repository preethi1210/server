const OTP=require('../models/OTP');
const { exists } = require('../models/User');
const User=require('../models/User');
const otpGenerator=require('otp-generator');
exports.sendOTP=async (req,res)=>{
    try{
    const {email}=req.body;
    const checkUserPresent=await User.findOne({email});
    if(checkUserPresent){
        return res.status.json(401)({
            success:false,
            message:'User already exists',
        })
    }
    var otp=otpGenerator(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    })
    console.log("OTP generated",otp);
    const result=await OTP.findOne({otp:otp});
    while(result){
        otp=otpGenerator(6,{        upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        result=await OTP.findOne({otp:otp})
    }
    const otpPayload={email,otp};
    const otpBody=await OTP.create(otpPayload);
    console.log(otpBody);
    res.status(200).json({
        success:true,message:"otp sent successfully",otp
    })
}
    catch(error){
        console.log(error);
        return res.status(500).json({
        success:false,
        message:error.message,
    })
    }
}
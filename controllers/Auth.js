const OTP=require('../models/OTP');
const { exists } = require('../models/User');
const User=require('../models/User');
const otpGenerator=require('otp-generator');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
exports.sendOTP=async (req,res)=>{
    try{
    const {email}=req.body;
    const checkUserPresent=await User.findOne({email});
    if(checkUserPresent){
        return res.status(401).json({
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
exports.signUp=async(req,res)=>{
try{
    const{
        firstName,
        lastName,
        email,password,confirmPassword,accountType,contactNumber,otp
    }=req.body;
    if(!firstName || !lastName || !email || !confirmPassword || !password  || !otp ){
        return res.status(403).json({
            success:false,
            message:'All fields are required',
        })
    }
    if(password!==confirmPassword){
        return res.status(400).json({
            success:false,
            message:'Password and confirm password are not matched , please try again',
        })
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:'User already registered',
        }) 
    }
    const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);
    if(recentOtp.length==0){
        return res.status(400).json({
            success:false,
            message:'OTP found',
        }) 
    }
    else if(otp!==recentOtp.otp){
        return res.status(400).json({
            success:false,
            message:'Invalid OTP ',
        }) 
    }
    const profileDetails=await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
    })
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        firstName,
        lastName,
        email,contactNumber,password:hashedPassword,accountType,additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg/seed=${firstName}${lastName}`
    })
    return res.status(200).json({
        success:true,
        message:'User registered successfully  ',
        user,
    }) 
}
catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:'Failed registration.Please try again  ',
}) 
}
}
exports.login=async(res,req)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
        return res.status(403).json({
            success:false,
            message:'Please enter all fields  ',
        }) 
    }
    const user=await User.findOne({email}).populate("additionalDetails");
    if(!user){
        return res.status(401).json({
            success:false,
            message:"User not registered.Sign up first  ",
        }) 

    }
    if(await bcrypt.compare(password,user.password)){
        const payLoad={
            email:user.email,
            id:user._id,
            role:user.role,
        }
        const token=jwt.sign(payLoad,process.env.JWT_SECRET,{
            expiresIn:"2h",

        })
        user.token=token;
        user.password=undefined;
        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
         res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"Logged in successfully"
        }) 

    }
    else{
        return res.status(401).json({
            success:false,
            message:'Password is incorrect',
        }) 
    }
}
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failed.Please try again  ',
        }) 
    }
}
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, email, newPassword, confirmNewPassword } = req.body;
        if (!oldPassword || !email || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password and confirm password do not match',
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Old password is incorrect',
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

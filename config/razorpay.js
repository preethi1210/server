const Razorpay=require("razorpay");
env=require('dotenv').config();
exports.instance=new Razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET,
})
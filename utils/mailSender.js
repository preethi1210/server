const nodemailer=require("nodemailer");
const mailSender=async (email,title,body)=>{
    try{
        let transporter=nodemailer.createTestAccount({
            host:process.env.MAIL.HOST,
            auth:{
                user:process.env.MAIL.USER,
                pass:process.env.MAIL.PASS,
            }
        })
        let info=await transporter.sendMail({
            from:'CodeHelp',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log(info);
        return info;
    }
    catch(error){console.log(error.message)}
}
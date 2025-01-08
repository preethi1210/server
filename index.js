const express=require(express);
const userRoutes=require(".routes/User");
const courseRoutes=require(".routes/Course");
const profileRoutes=require(".routes/Profile");
const paymentRoutes=require(".routes/Payments");
const database=require(".config/database");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect}=require(".config/cloudinary")
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");
dotenv.config();
const PORT=process.env.PORT || 4000;
database.connect();
app.use(express.json());
app.use(cookieParser.json());
app.use(cors({origin:"https://localhost:3000",
credentials:true,}))
app.use(fileUpload({useTempFiles:true,tempFileDir:"/tmp"}));
cloudinaryConnect();
app.use("api/v1/auth",userRoutes);
app.use("api/v1/Profile",profileRoutes);
app.use("api/v1/Course",courseRoutes);
app.use("api/v1/Payments",paymentRoutes);
app.get("/",(req,res)=>{
    res.json({success:true,message:"Server is running"})
})
app.listen(PORT,()=>{console.log(`App running at ${PORT}`)})
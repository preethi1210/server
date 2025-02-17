import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import video1 from "../assets/videos/video1.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection.JSX";
const Home = () => {
  return (
    <div className="bg-gray-900 ">
            {/*section 1*/}
            <div  className="w-11/12  m-0">
      <div className="relative mt-16 mx-auto flex flex-col w-full items-center text-white justify-center ">
      <Link to="/signup">
        <div className="group mx-16 p-1 rounded-full bg-gray-800 font-bold text-gray-200 transition-all duration-200 hover:scale-95 w-fit border-2 border-gray-500 shadow-lg">
          <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-gray-900 group-hover:text-lg">
            <p>Become an Instructor</p>
            <FaLongArrowAltRight />
          </div>
        </div>
      </Link>
    
      <div className="w-[55%] text-center text-2xl font-bold mt-7">
        Empower Your Future Growth with{" "}
        <span className="bg-blue-400 bg-clip-text  text-transparent">
          Coding Skills
        </span>
      </div>
    </div>
    
      {/* Description Section */}
      <div className="w-[58%] mt-4 text-sm text-center font-bold text-gray-300 mx-auto">
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized learning.
        <div className="flex flex-row gap-7 mt-8 justify-center">
          <CTAButton active={true} linkto="/signup">Learn more</CTAButton>
          <CTAButton active={false} linkto="/login">Book a Demo</CTAButton>
        </div>
      </div>

      {/* Video Section */}
      <div className="w-[87%] mx-auto my-7 flex justify-center items-center">
        <video
          muted
          loop
          autoPlay
          className="w-[80%] max-h-[500px] shadow-[15px_15px_0px_rgba(255,255,255,1)]"
        >
          <source src={video1} type="video/mp4" />
        </video>
      </div>

      {/* Code Blocks Section */}
      <div className="w-[87%] mx-auto flex justify-center items-center ">
        <CodeBlocks 
          position="lg:flex"
          heading={
            <div className="mx-auto text-3xl font-bold text-amber-50">
              Unlock Your <HighlightText text="coding potential" /> with our online courses
            </div>
          }
          subheading={
            <p className="text-sm">
              Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
            </p>
          }
          ctabtn1={{ btnText: "Try it yourself", linkto: "/signup", active: true }}
          ctabtn2={{ btnText: "Learn more", linkto: "/login", active: false }}
codeblock={
`<!DOCTYPE html>
<html>
<head><title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav><a href="one/">One</a><a href="two/">Two</a><a 
href="three/">Three</a>
</nav>
</body>
</html>`}
          backgroundGradient={["bg-[radial-gradient(circle_at_30%_40%,rgba(240,0,0,0.3)_0%,transparent_50%)]"]}
          codeColor="text-yellow-25"
        />
      </div>

      {/* Second Code Blocks Section */}
      <div className="w-[87%] mx-auto">
        <CodeBlocks 
          position="lg:flex-row-reverse"
          heading={
            <div className="text-3xl font-bold text-amber-50">
              Start <HighlightText text={<span>coding <br /> in seconds</span>} />
            </div>
          }
          subheading={
            <p className="text-sm">
              Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
            </p>
          }
          ctabtn1={{ btnText: "Continue Lesson", linkto: "/signup", active: true }}
          ctabtn2={{ btnText: "Learn more", linkto: "/login", active: false }}
          codeblock={
`<!DOCTYPE html>
<html>
<head><title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav><a href="one/">One</a><a href="two/">Two</a>
<a href="three/">Three</a>
</nav>
</body>
</html>`}
backgroundGradient={["bg-[radial-gradient(circle_at_30%_40%,rgba(0,0,240,0.3)_0%,transparent_50%)]"]}
  codeColor="text-yellow-25"
        />
      </div>
      </div>
      <div className="bg-white ">
           
      {/*section -(blw 1 and 2)*/}
      <div className="m-4 p-6 flex flex-row gap-7 mt-8 justify-center">
      <CTAButton active={true} linkto="/signup">
      <div className="flex flex-row items-center gap-1 rounded-full transition-all duration-200 group-hover:bg-gray-900 group-hover:text-md">
      <p> Explore Full Coding </p>
      <FaLongArrowAltRight />
    </div>
      </CTAButton>
      <CTAButton active={false} linkto="/login">Learn more</CTAButton>
      </div>
 
      {/*section 2*/}

      <div className=" flex  w-[85%] mx-45 " >
      <div className="text-2xl font-bold w-[34%] items-center  justify-between " >
      <div>Get the skills you need for a <HighlightText text=" job that is in demand"/> 
      </div>
      </div>
      <div className=" text-black text-16px w-[45%] ">
      <p>The modern study notion dictates its own terms. Today to be a competitive specialist requires more than professional skills</p>
      <br/><br/>
      <CTAButton active={true} linkto="/signup">Learn more</CTAButton>
      </div>
      </div>
      <div className=" p-6 flex flex-row gap-7 mt-8 justify-center">
      <TimeLineSection/>
      <LearningLanguageSection/></div>
     
      <h2>Your swiss knife for <HighlightText text={"Your swiss knife for learning any language"}/> </h2>
      </div>
    </div>
  );
};

export default Home;

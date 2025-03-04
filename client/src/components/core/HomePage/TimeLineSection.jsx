import React from "react";
import Logo1 from "../../../assets/Timelinelogo/Logo1.png";
import Logo2 from "../../../assets/Timelinelogo/Logo2.png";
import Logo3 from "../../../assets/Timelinelogo/Logo3.png";
import Logo4 from "../../../assets/Timelinelogo/Logo4.png";
import timelineImage from "../../../assets/Images/bg_img_home.jpg";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success of the company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skill",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimeLineSection = () => {
  return (
    <div>
      <div className="flex mx-41 flex-row gap-10 mt-10 w-[11/12] items-center">
        {/* Timeline Text Section */}
        <div className="w-[43%] flex flex-col gap-5">
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-row gap-6" key={index}>
                <div className="w-[50px] h-[50px] bg-white flex items-center">
                  <img src={element.Logo} alt="logo" />
                </div>
                <div>
                  <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Image Section */}
        <div className="relative shadow-blue-200  ">
          <img
            src={timelineImage}
            alt="timelineImage"
            className="w-[500px] shadow-white object-cover h-fit"
          />
          
          {/* Green Info Box */}
          <div className="absolute bg-green-900 flex flex-row text-white p-5 uppercase w-[75%] bottom-[-15%] left-1/2 -translate-x-1/2 ">
            <div className="flex flex-row gap-5.5 items-center border-r  border-green-300 w-1/2 justify-center">
              <p className="text-2xl font-bold">10</p>
              <p className="text-green-300 text-sm">Years of experience </p>
            </div>
            <div className="flex gap-5 px-7 items-center w-1/2 justify-center">
              <p className="text-2xl font-bold">250</p>
              <p className="text-green-300 text-sm">Types of courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;

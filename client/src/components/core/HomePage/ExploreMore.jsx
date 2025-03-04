import React, { useState } from "react";
import exploreHomepage from "../../../assets/data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "../../../assets/data/CourseCard"; // Ensure the correct path

const tabsName = ["Free", "New to Coding", "Most Popular", "Skill Paths", "Career Paths"];

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(exploreHomepage[0].courses);
    const [currentCard, setCurrentCard] = useState(exploreHomepage[0].courses[0].heading || "");

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = exploreHomepage.find((course) => course.tag === value);
        setCourses(result ? result.courses : []);
        setCurrentCard(result?.courses[0]?.heading || ""); // Fallback to avoid errors
    };

    return (
        <div >
            {/* Header */}
            <div className=" bg-gray-900">
            <div className="text-4xl text-amber-50 font-semibold text-center">
                Unlock the <HighlightText text="Power of Code" />
            </div>
            <p className="text-center text-white text-[16px] mt-3">
                Learn to build anything you can imagine
            </p>

            {/* Tabs Section */}
            <div className="flex flex-wrap justify-center text-amber-50 p-2 mt-6 rounded-full w-[85%] mx-auto">
                {tabsName.map((element, index) => (
                    <div 
                        key={index}
                        className={`text-[16px] px-6 py-2 rounded-full cursor-pointer 
                            transition-all duration-200 
                            ${currentTab === element ? "bg-gray-900 text-white font-medium" : "text-gray-400 hover:bg-gray-300"}`}
                        onClick={() => setMyCards(element)}
                    >
                        {element}
                    </div>
                ))}
            </div>
            </div>
            {/* Spacing */}
            <div className="relative w-full h-[400px]">
            {/* Top Half - Gray Background */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gray-900" >
            </div>
          
            {/* Bottom Half - White Background */}
          
            {/* Content Wrapper */}
            <div className="relative z-10 py-5">
              {/* Spacing */}
              <div className="lg:h-[70px]"></div>
          
              {/* Courses Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[85%] mx-auto">
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <CourseCard
                      key={index}
                      heading={course.heading}
                      description={course.description}
                      level={course.level}
                      lessons={course.lessons}
                    />
                  ))
                ) : (
                  <p className="text-center text-white text-lg col-span-full">No courses available.</p>
                )}
              </div>
            </div>
          </div>
          
        </div>
    );
};

export default ExploreMore;

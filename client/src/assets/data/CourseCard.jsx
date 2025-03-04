import React from "react";
import { Book, GraduationCap } from "lucide-react";

const CourseCard = ({ heading, description, level, lessons }) => {
  return (
    <div className="group bg-gray-700 shadow-[0px_8px_20px_rgba(0,0,0,2)] border-r border-b p-4 border transition-all duration-300 h-60 flex flex-col hover:bg-white hover:shadow-[4px_4px_20px_0px_rgba(255,215,0,1)]">
      {/* Title with Icon */}
      <h2 className="text-lg font-bold text-amber-50 group-hover:text-black flex items-center">
        {heading}
      </h2>

      {/* Description */}
      <p className="text-gray-400 text-sm mt-2 group-hover:text-gray-600">
        {description}
      </p>

      {/* Level & Lessons - Fixed at Bottom */}
      <div className="flex justify-between mt-auto text-gray-300 group-hover:text-blue-500">
        <div className="flex items-center">
          <GraduationCap size={16} className="mr-1" />
          <span>{level}</span>
        </div>
        <span className="font-semibold">{lessons}  Lessons</span>
      </div>
    </div>
  );
};

export default CourseCard;

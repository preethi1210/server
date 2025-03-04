import React from 'react';
import HighlightText from './HighlightText';
import calenderImg from "../../../assets/LearnLang/cal.png";
import compareImg from "../../../assets/LearnLang/com.png";
import progressImg from "../../../assets/LearnLang/pro.png";
import CTAButton from "../HomePage/Button"
const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mx-auto w-3/4 flex items-center'>
      <div className='flex flex-col gap-5'>
        
        {/* Heading */}
        <div className='text-3xl font-bold text-center'>
          Your Swiss Knife for <HighlightText text={" learning any language"} />
        </div>
        
        {/* Subtitle */}
        <div className='w-[45%] text-center font-medium text-gray-700 mx-auto text-base'>
          Using spin making learning multiple languages easy, 20+ languages realistic voice-over, progress tracking, custom schedule, and more.
        </div>
        
        {/* Image Container */}
        <div className="flex justify-center items-center  mx-90 relative w-60 h-60   mt-8">
          <img src={progressImg} alt="progressImg" className="object-contain rotate-6" />
          <img src={compareImg} alt="compareImg" className="object-contain -rotate-8" />
          <img src={calenderImg} alt="calenderImg" className="object-contain rotate-8 " />
        </div>
      <div className='w-fit mx-auto py-10 '>
      <CTAButton active={true} linkto={"/signup"}>
      <div>Learn more</div>
      </CTAButton>
      </div>        </div>

    </div>
  );
};

export default LearningLanguageSection;

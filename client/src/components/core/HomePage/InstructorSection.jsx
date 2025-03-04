import React from 'react'
import HighLightText from './HighlightText'
import InstructorImg from "../../../assets/Images/InstuctorImg.jpg"
import CTAButton from "./Button"
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className='mt-14 mb-32 '>
      <div className='flex flex-row gap-20 items-center '>
      <div className='w-[50%]'>
      <img src={InstructorImg} alt='' className='shadow-[10px_10px_0px_rgba(255,255,255,3)]' />
      </div>
      <div className='w-[50%] flex flex-col gap-10 '>
      <div className='text-4xl font-semibold w-[50%]'>Become an <HighLightText text={"Instructor"} /> </div>
      <p className='font-medium text-[16px] w-[90%] text-gray-300'>Instructors from around the world teach millions of students on StudyMotion. We provide the tools and skills to teach what  you love.</p>
      <CTAButton active={true} linkto={"/signup"}>
      <div className="flex items-center gap-2">
        Start learning today <FaArrowRight />
      </div>
    </CTAButton>
    
      </div>
      </div>
    </div>
  )
}

export default InstructorSection

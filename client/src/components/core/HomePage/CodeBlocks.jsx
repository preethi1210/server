import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css"; // Ensure the theme is imported
import "prismjs/components/prism-markup"; // Include Prism's HTML tokenizer
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "../HomePage/Button";

const CodeBlocks = ({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) => {
  const [animatedCode, setAnimatedCode] = useState(""); // Store animated text

  useEffect(() => {
    if (animatedCode) {
      Prism.highlightAll(); // Ensure syntax highlighting updates on text change
    }
  }, [animatedCode]);

  return (
    <div className={`flex flex-wrap ${position} my-4 justify-between items-center w-[87%] mx-25`}>
      
      {/* Left Section: Heading & Buttons */}
      <div className="w-[45%] flex flex-col gap-6">
        {heading}
        <div className="text-gray-300 font-bold text-sm">{subheading}</div>
        
        {/* CTA Buttons */}
        <div className="flex gap-5 mt-5">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Right Section: Code Block */}
{/* Right Section: Code Block */}
{/* Right Section: Code Block */}
<div className={`relative w-[50%] border  border-gray-870 px-6 py-5 rounded-md shadow-lg flex ${backgroundGradient}`}>
  
  {/* Wrapper for Line Numbers and Code */}
  <div className="flex w-full ">
    
    {/* Line Numbers */}
    <div className="relative text-amber-50 text-xs my-4 font-bold font-mono flex flex-col items-end pr-4 leading-relaxed">
      {Array.from({ length: codeblock.split("\n").length }, (_, i) => (
        <p key={i}>{i + 1}</p>
      ))}
    </div>

    {/* Animated Code */}
    <div className={`w-full my-0 text-xs font-mono whitespace-pre-wrap`}>
    <pre className="rounded-lg p-0 mx-0  my-0 m-0 " style={{ background: "transparent" }}>
    <code className="language-html block ">
          <TypeAnimation
            sequence={[
              codeblock, 
              10000, 
              () => setAnimatedCode(codeblock) // Store updated text for Prism
            ]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
          />
        </code>
      </pre>
    </div>

  </div>
</div>

  </div>
  );
};

export default CodeBlocks;

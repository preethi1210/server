import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, active, linkto = "#" }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] px-6 py-3 rounded-md font-bold w-fit inline-block
           ${active ? "bg-yellow-400 text-black" : "bg-gray-900 text-amber-50"} 
           hover:scale-115 transition-all duration-200 shadow-md hover:shadow-lg
           border-2 border-transparent hover:border-yellow-500`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
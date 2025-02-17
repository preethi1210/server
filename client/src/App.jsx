import React from "react";
import {Route,Routes} from "react-router-dom"
import Home from "./Pages/Home"
const App = () => {
  return (
    <div className="w-screen min-h-screen   flex flex-col font-inter  ">
    <Routes>
    <Route path="/" element={<Home/>} />
    </Routes>
    </div>
  );
};

export default App;

import React from "react";
import {Route,Routes} from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Navbar from "./components/common/Navbar";
const App = () => {
  return (
    <div className="w-screen min-h-screen   flex flex-col font-inter  ">
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    </Routes>
    </div>
  );
};

export default App;

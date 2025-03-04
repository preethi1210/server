import React, { useState, useEffect } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaArrowCircleRight } from "react-icons/fa";
import { NavbarLinks } from "../../assets/data/navbar-links";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";

const defaultSubLinks = [
  {
    title: "Python",
    link: "/catalog/python",
  },
  {
    title: "Web Development",
    link: "/catalog/web-development",
  },
];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState(defaultSubLinks);
  const location = useLocation();

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing sublinks", result);
      setSubLinks(result.data.data || defaultSubLinks);
    } catch (error) {
      console.error("Could not fetch category list", error);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className="flex m-0 h-14 items-center bg-gray-900 justify-center border-b-[1px] border-b-gray-700">
      <div className="flex w-[70%] items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <SiGoogleclassroom className="text-white text-3xl" />
          <p className="text-sm font-semibold text-white">StudyNotion</p>
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-x-6 text-white">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative group">
                {link.title === "Catalog" ? (
                  <div className="flex items-center gap-2 cursor-pointer">
                    <p>{link.title}</p>
                    <FaArrowCircleRight />

                    {/* Dropdown */}
                    <div className="absolute left-0 top-full mt-2 hidden w-[200px] flex-col rounded-md bg-white p-2.5 text-gray-500 shadow-lg group-hover:flex">
                      {subLinks.length > 0 ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            to={subLink.link}
                            key={i}
                            className="block p-0.2 hover:bg-gray-200 rounded-md"
                          >
                            {subLink.title}
                          </Link>
                        ))
                      ) : (
                        <p className="p-2 text-center text-gray-400">No categories available</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => (isActive ? "text-amber-200" : "text-white")}
                  >
                    <p>{link.title}</p>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Buttons */}
        <div className="flex gap-x-4">
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-white text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  {totalItems || 0}
                </span>
              )}
            </Link>
          )}

          {token === null ? (
            <>
              <Link to="/login">
                <button className="border border-gray-700 bg-gray-800 px-3 py-2 text-white rounded-md">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-gray-700 bg-gray-800 px-3 py-2 text-white rounded-md">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

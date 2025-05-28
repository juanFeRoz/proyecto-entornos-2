import React, { useEffect, useState } from "react";
import { navbar } from "../data/Data";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineShoppingBag } from "react-icons/md";
import { HiOutlineHeart, HiOutlineUser } from "react-icons/hi";
import Sidebar from "./Sidebar";
import Userbar from "./Userbar";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserbarOpen, setIsUserbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserbar = () => {
    setIsUserbarOpen(!isUserbarOpen);
  };

  const { totalItems } = useSelector((state) => state.cart);

  return (
    <>
      <header className={`w-full bg-white ${sticky ? "fixed top-0 left-0 w-full shadow-md z-50" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link to="/" className="text-3xl font-bold text-gray-900">
                Refleja
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              {navbar.map((nav, key) => (
                <Link
                  key={key}
                  to={nav.path}
                  className="text-base font-medium text-gray-700 hover:text-secondary transition-colors duration-200"
                >
                  {nav.nav}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-6">
              <button
                onClick={toggleSidebar}
                className="text-2xl text-gray-700 hover:text-secondary transition-colors duration-200"
              >
                <HiOutlineHeart />
              </button>
              
              <button
                onClick={toggleUserbar}
                className="text-2xl text-gray-700 hover:text-secondary transition-colors duration-200"
              >
                <HiOutlineUser />
              </button>
              
              <button
                onClick={toggleSidebar}
                className="relative text-2xl text-gray-700 hover:text-secondary transition-colors duration-200"
              >
                <MdOutlineShoppingBag />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={toggleSidebar}
      />
      <Userbar
        isUserbarOpen={isUserbarOpen}
        closeUserbar={toggleUserbar}
      />
    </>
  );
};

export default Header;

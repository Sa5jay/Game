import { BiSolidCategory } from "react-icons/bi";
import { MdLocalGroceryStore,MdDeveloperMode  } from "react-icons/md";
import { FaTag } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { RiComputerFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import React from "react";

const links = [
  { name: "Home", path: "/", icon: <IoHome  /> },
  { name: "Tags", path: "/tags", icon: <FaTag /> },
  { name: "Genres", path: "/genres", icon: <BiSolidCategory  /> },
  { name: "Stores", path: "/stores", icon: <MdLocalGroceryStore  /> },
  { name: "Platforms", path: "/platforms", icon: <RiComputerFill /> },
  { name: "Developers", path: "/developers", icon: <MdDeveloperMode  /> }
];

const Sidebar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const mainLinks = links.slice(0, 3);
  const moreLinks = links.slice(3);

  return (
    <>
      {/* Desktop Sidebar (md and up) */}
      <div className="hidden md:flex fixed left-0 top-0 m-4 text-white border border-[#111111] rounded-lg min-h-screen w-64 p-4 flex-col z-40">
        <h1 className="flex justify-center items-center font-bold m-2 mb-8 p-4 border-t border-b text-[#E50914] border-white md:text-4xl">
          GameZone
        </h1>
        <div className="flex-1 font-bold text-2xl">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex mb-4 items-center gap-3 font-bold 
                  ${isActive ? "text-[#E50914]" : "hover:text-gray-400"}`}
              >
                <span className="w-6 h-6 flex items-center justify-center">
                  {link.icon}
                </span>
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile / Tablet Navbar (below md) */}
      <nav className="md:hidden w-full px-3 py-2 border-b border-black flex items-center justify-between z-50 relative">
        {/* Brand */}
        <span className="text-[#E50914] flex-col flex border-t-2 border-b-2 border-[#E50914] items-center text-xl font-bold flex-shrink-0 max-w-[30vw] truncate">
          <span>Game</span>
          <span>Zone</span>
        </span>

        {/* Center nav icons */}
        <div className="flex-1 flex justify-center">
          <div className="flex gap-6 sm:gap-8 px-2">
            {/* Show 3 icons only on <sm */}
            <div className="flex sm:hidden gap-8">
              {mainLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex flex-col items-center justify-center text-xs
                      ${isActive ? "text-[#E50914]" : "text-white"}`}
                  >
                    <span className="w-6 h-6 flex items-center justify-center">
                      {React.cloneElement(link.icon, { className: "w-5 h-5" })}
                    </span>
                    <span className="mt-1">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Show ALL icons between sm and md */}
            <div className="hidden sm:flex gap-8">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex flex-col items-center justify-center text-sm
                      ${isActive ? "text-[#E50914]" : "text-white"}`}
                  >
                    <span className="w-6 h-6 flex items-center justify-center">
                      {React.cloneElement(link.icon, { className: "w-6 h-6" })}
                    </span>
                    <span className="mt-1">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hamburger only below sm */}
        <div className="sm:hidden">
          {moreLinks.length > 0 && (
            <button
              className="text-white text-lg flex-shrink-0 ml-2 w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#292929] transition"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
            >
              <GiHamburgerMenu className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Dropdown for extra icons */}
        {menuOpen && (
          <div className="absolute top-full right-2 mt-2 w-44 sm:w-52 bg-gray-800 border border-white rounded-lg shadow-lg flex flex-col z-50">
            {moreLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 text-base
                    ${isActive ? "text-[#E50914]" : "text-white"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="w-6 h-6 flex items-center justify-center">
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
};

export default Sidebar;

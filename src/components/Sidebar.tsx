import { BiSolidCategory } from "react-icons/bi";
import { MdLocalGroceryStore, MdDeveloperMode } from "react-icons/md";
import { FaTag } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { RiComputerFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Searchbar from "@/components/Searchbar";
import { Search } from "lucide-react";

const links = [
  { name: "Home", path: "/", icon: <IoHome /> },
  { name: "Tags", path: "/tags", icon: <FaTag /> },
  { name: "Genres", path: "/genres", icon: <BiSolidCategory /> },
  { name: "Stores", path: "/stores", icon: <MdLocalGroceryStore /> },
  { name: "Platforms", path: "/platforms", icon: <RiComputerFill /> },
  { name: "Developers", path: "/developers", icon: <MdDeveloperMode /> },
];

const Sidebar = () => {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 m-4 text-white border border-[#111111] rounded-lg min-h-screen w-64 p-4 flex-col z-40">
        <Link to={"/"}>
          <h1 className="flex justify-center items-center font-bold m-2 mb-8 p-4 border-t border-b text-[#E50914] border-white md:text-4xl">
            GameZone
          </h1>
        </Link>
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

      {/* Mobile header + nav */}
      <div className="md:hidden bg-black">
        {/* Header */}
        <header className="fixed top-0 w-full px-3 py-2 border-b border-gray-800 bg-black flex items-center justify-between z-40">
          <Link to="/" className="flex-shrink-0">
            <div className="text-[#E50914] text-2xl font-extrabold">
              GameAtlas
            </div>
          </Link>

          <button onClick={() => setShowSearch((prev) => !prev)}>
            <Search className="w-6 h-6 text-[#E50914]" />
          </button>
        </header>

        {/* Spacer for header height */}
        <div className="mb-12"></div>

        {/* Searchbar dropdown */}
        <div
          className={`fixed top-12 left-0 right-0 bg-black  transition-all duration-300 ${
            showSearch ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          <Searchbar />
        </div>

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-40">
          <div className="flex justify-around items-center py-2 px-2">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex flex-col items-center justify-center text-xs py-2 px-1 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "text-[#E50914]"
                      : "text-white hover:text-gray-400"
                  }`}
                >
                  <span className="w-6 h-6 flex items-center justify-center mb-1">
                    {React.cloneElement(link.icon, {
                      className: `w-5 h-5 ${
                        isActive ? "text-[#E50914]" : "text-current"
                      }`,
                    })}
                  </span>
                  <span className="text-xs font-medium leading-none">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

import { FaHome, FaTag, FaStore } from "react-icons/fa";
import { SiPlatformdotsh } from "react-icons/si";
import { RiComputerFill } from "react-icons/ri";
import { SiXdadevelopers } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const links = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Tags", path: "/tags", icon: <FaTag /> },
  { name: "Genres", path: "/genres", icon: <SiPlatformdotsh /> },
  { name: "Stores", path: "/stores", icon: <FaStore /> },
  { name: "Platforms", path: "/platforms", icon: <RiComputerFill /> },
  { name: "Developers", path: "/developers", icon: <SiXdadevelopers /> }
];

const Sidebar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const mainLinks = links.slice(0, 5);
  const moreLinks = links.slice(5);

  return (
    <>
      <div className="hidden md:flex  fixed left-0 top-0 m-4 text-white border border-[#111111] rounded-lg min-h-screen w-64 h-175 p-4 flex-col z-40">
        <div>
          <h1 className='flex justify-center items-center  font-bold m-2 mb-8 p-4 border-t border-b text-[#E50914] border-white  text-4xl'>
            GameZone
          </h1>
        </div>
        <div className='flex-1 font-bold text-2xl'>
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex mb-4 items-center gap-2 font-bold 
                  ${isActive ? "text-[#E50914]" : " hover:text-gray-400"} 
                  `}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </div>
        
      </div>

      {/* Mobile: GameZone left, icons center, menu right */}
      <nav className="md:hidden w-full px-3 py-2  border-b border-black flex items-center justify-between z-50 relative">
        {/* GameZone left */}
        <span className="text-[#E50914] text-base xs:text-lg border-t border-b border-white sm:text-xl font-bold flex-shrink-0 max-w-[30vw] truncate">
          GameZone
        </span>
        {/* Centered icons */}
        <div className="flex-1 flex justify-center min-w-0">
          <div className="flex gap-1 xs:gap-2 sm:gap-4 border border-white px-2 rounded-lg shadow min-w-0 overflow-x-auto">
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center justify-center text-lg xs:text-xl w-8 h-8 xs:w-9 xs:h-9 rounded-full transition-colors duration-200
                    ${isActive ? "text-[#E50914]" : "text-white "}
                  `}
                  title={link.name}
                >
                  {link.icon}
                </Link>
              );
            })}
          </div>
        </div>
        {/* Hamburger menu right */}
        {moreLinks.length > 0 && (
          <button
            className="text-white text-lg xs:text-xl flex-shrink-0 ml-2 w-8 h-8 xs:w-9 xs:h-9 flex items-center justify-center rounded-full hover:bg-[#292929] transition"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            <GiHamburgerMenu />
          </button>
        )}

        {menuOpen && (
          <div className="absolute top-full right-2 mt-2 w-44 xs:w-52 bg-gray-400   border border-white rounded-lg shadow-lg flex flex-col z-50">
            {moreLinks.map((link) =>{ 
              const isActive = location.pathname === link.path;
              return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 border-b border-white px-4 py-3 text-base xs:text-lg
                  ${isActive ? "text-[#E50914]" : "text-white "}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-lg xs:text-xl w-7 h-7 flex items-center justify-center">{link.icon}</span>
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
import { FaHome, FaHeart, FaTag, FaStore } from "react-icons/fa";
import { SiPlatformdotsh } from "react-icons/si";
import { RiComputerFill } from "react-icons/ri";
import { SiXdadevelopers } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const links = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Favourites", path: "/favourites", icon: <FaHeart /> },
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
      {/* Sidebar for md and above */}
      <div className="hidden md:flex  fixed left-0 top-0 m-4 bg-[#111111] border border-[#E50914] rounded-lg max-h-screen w-64 h-175 p-4 flex-col z-40">
        <div>
          <h1 className='flex justify-center items-center rounded-xl m-2 mb-8 p-4 border-t border-b border-[#E50914] text-white text-3xl'>
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
                  ${isActive ? "text-[#E50914]" : "text-white hover:text-amber-300"} 
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
      <nav className="md:hidden w-full px-3 py-2 bg-[#181818] border-b border-[#E50914] flex items-center justify-between z-50 relative">
        {/* GameZone left */}
        <span className="text-[#E50914] text-base xs:text-lg sm:text-xl font-bold flex-shrink-0 max-w-[30vw] truncate">
          GameZone
        </span>
        {/* Centered icons */}
        <div className="flex-1 flex justify-center min-w-0">
          <div className="flex gap-2 xs:gap-3 sm:gap-4 bg-[#222] px-2 py-1 rounded-lg shadow min-w-0 overflow-x-auto">
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center justify-center text-lg xs:text-xl w-8 h-8 xs:w-9 xs:h-9 rounded-full transition-colors duration-200
                    ${isActive ? "text-[#E50914] bg-[#292929]" : "text-white hover:text-amber-300"}
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
        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute top-full right-2 mt-2 w-44 xs:w-52 bg-[#181818] border border-[#E50914] rounded-lg shadow-lg flex flex-col z-50">
            {moreLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-2 text-white px-4 py-3 text-base xs:text-lg hover:text-[#E50914]"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-lg xs:text-xl w-7 h-7 flex items-center justify-center">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Sidebar;
import { FaHome, FaHeart, FaTag, FaStore } from "react-icons/fa";
import { SiPlatformdotsh } from "react-icons/si";
import { RiComputerFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Get current route path

 
  const links = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Favourites", path: "/favourites", icon: <FaHeart /> },
    { name: "Tags", path: "/tags", icon: <FaTag /> },
    { name: "Genres", path: "/genres", icon: <SiPlatformdotsh /> },
    { name: "Stores", path: "/stores", icon: <FaStore /> },
    { name: "Platforms", path: "/platforms", icon: <RiComputerFill /> },
  ];

  return (
    <div className='fixed left-0 top-0 m-4  bg-[#111111] border border-[#E50914] rounded-lg max-h-screen w-64 h-175 p-4 flex flex-col'>
      {/* Header */}
      <div>
        <h1 className='flex justify-center items-center rounded-xl m-2 mb-8 p-4 border-t border-b border-[#E50914] text-white text-3xl'>
          GameZone
        </h1>
      </div>

      {/* Navigation Links */}
      <div className='flex-1 font-bold text-2xl'>
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex mb-4 items-center gap-2 font-bold 
                ${isActive ? "text-[#E50914]" : "text-white"} 
                hover:text-[#FFCC00]`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

import { FaHome, FaHeart,  FaTag, FaStore    } from "react-icons/fa";
import { SiPlatformdotsh } from "react-icons/si";
import { RiComputerFill } from "react-icons/ri";
import { Link } from "react-router-dom"






const sidebar = () => {
  return (
    <div className='fixed left-0 top-0 m-4  bg-gray-700 rounded-lg max-h-screen w-64 h-175 p-4 flex flex-col'>
      {/* Header */}
      <div>
        <h1 className='flex justify-center items-center rounded-xl m-2 mb-8 p-4 border-t border-b border-amber-200   text-white text-3xl'>
          GameZone
        </h1>
      </div>
      
      {/* Navigation Links - This will grow and take available space */}
      <div className='flex-1 font-bold text-2xl'>
        <Link   to={"/"} className="flex mb-4 items-center gap-2 hover:text-amber-200 text-gray-900">
          <FaHome />
          Home
        </Link>   
        
        <Link to={"/favourites"} className="flex mb-4 items-center hover:text-amber-200 gap-2 text-gray-900">
          <FaHeart />
          Favourites
        </Link>
        
        <Link to={"/tags"} className="flex mb-4 items-center hover:text-amber-200 gap-2 text-gray-900">
          <FaTag />
          Tags
        </Link>
        
        <Link  to={"/genres"} className="flex mb-4 items-center hover:text-amber-200 gap-2 text-gray-900">
          <SiPlatformdotsh  />
          Genres
        </Link>
        
        <Link to={"/stores"} className="flex mb-4 items-center hover:text-amber-200 gap-2 text-gray-900">
          <FaStore />
          Stores
        </Link>
        
        <Link to={"/platforms"} className="flex mb-4 items-center hover:text-amber-200 gap-2 font-bold text-gray-900">
          <RiComputerFill />
          Platforms
        </Link>
      </div>
      
      {/* Sign in Button - This will stay at the bottom with proper spacing */}
      
    </div>
  )
}

export default sidebar
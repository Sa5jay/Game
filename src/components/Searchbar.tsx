
import { Search } from "lucide-react"

const Searchbar = () => {
  return (
    <div className="  top-0 left-[270px] w-full flex   ">
       <Search className="text-gray-400 w-7 h-7 mt-2 " />
        <input 
          placeholder="Search..."
          className="w-6xl px-4 py-2  text-white border-b outline-none"
        />
      </div>
  )
}

export default Searchbar

import { Search } from "lucide-react"

const Searchbar = () => {
  return (
    <div className="  top-0 left-[270px] w-full flex bg-[#111111] rounded-lg   ">
       <Search className="text-[#E50914] w-9 h-9  " />
        <input 
          placeholder="  Search..." 
          className="w-6xl px-4 py-2   text-white  outline-none"
        />
      </div>
  )
}

export default Searchbar
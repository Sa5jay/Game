import { Search } from "lucide-react"

const Searchbar = () => {
  return (
    <div className="w-full flex bg-[#111111] rounded-lg p-2 mt-2 md:mt-0">
      <Search className="text-[#E50914] w-8 h-8 flex-shrink-0" />
      <input 
        placeholder="  Search..." 
        className="w-full px-4 py-2 text-white outline-none bg-transparent"
      />
    </div>
  )
}

export default Searchbar
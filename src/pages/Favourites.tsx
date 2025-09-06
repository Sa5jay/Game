import GameDetails from "@/components/GameDetails"
import Sidebar from "@/components/Sidebar"




const Favourites = () => {
  return (
    <div className='grid grid-cols-12 min-h-screen gap-6 p-6'>
      <div className="col-span-2">
        <Sidebar/>
      </div>
    </div>
  )
}

export default Favourites
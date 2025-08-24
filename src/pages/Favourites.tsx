import Sidebar from "@/components/Sidebar"
import GameDetails from "@/components/GameDetails"



const Favourites = () => {
  return (
    <div className='grid grid-cols-12 min-h-screen gap-6 p-6'>
      <div className='min-h-screen col-span-2'>
        <Sidebar />
      </div>
      <div className='col-span-10  ml-3'>
        <GameDetails />
      </div>
    </div>
  )
}

export default Favourites
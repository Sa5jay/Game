import Sidebar from "@/components/Sidebar"
import PlatformCard from "@/components/Cards/PlatformCard"
import React, { useState } from 'react'

interface Props{
  id: number;
  name: string;
  image_background: string;
}


const Platforms = () => {
  const [platforms, setPlatforms] = useState<Props[]>([]);
    const fetchplatforms = async () => {
      const res = await fetch(
        `https://api.rawg.io/api/platforms?key=${import.meta.env.VITE_API_KEY}`
      );
      const data = await res.json();
      setPlatforms(data.results);
    };
  
    React.useEffect(() => {
      fetchplatforms();
    }, []);
  return (
    <div className='grid grid-cols-12 min-h-screen gap-6 p-6'>
       <div className='min-h-screen col-span-2'>
          <Sidebar />
        </div>
        <div className="col-span-10 ml-3">
          <h1 className="text-amber-200 text-5xl mb-4 font-bold">Platforms</h1>
          <div  className='flex flex-wrap  gap-4'>
            {platforms.map((platform) => (    
            <PlatformCard key={platform.id}  title={platform.name}  image={platform.image_background}/> 
          ))}
          </div>
        </div>
        
          

    </div>
  )
}

export default Platforms
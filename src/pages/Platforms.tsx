import Sidebar from "@/components/Sidebar"
import React, { useState } from 'react'
import Card from "@/components/Cards/Card";
import { BounceLoader } from "react-spinners";

interface Props{
  id: number;
  name: string;
  image_background: string;
  slug: string;
}


const Platforms = () => {
  const [platforms, setPlatforms] = useState<Props[]>([]);
  const [loading, setLoading] = useState(false);
    const fetchplatforms = async () => {
      if(loading) return;
      setLoading(true);
      const res = await fetch(
        `https://api.rawg.io/api/platforms?key=${import.meta.env.VITE_API_KEY}`
      );
      const data = await res.json();
      setPlatforms(data.results);
      setLoading(false);
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
            <Card slug={platform.id}  title={platform.name}  type="platforms"  image={platform.image_background}/> 
          ))}
          </div>
          {loading &&  <div className="flex justify-center items-center"><BounceLoader
 color="red"/></div>}
        </div>
        
          

    </div>
  )
}

export default Platforms
import Sidebar from "@/components/Sidebar"
import React, { useState } from 'react'
import Card from "@/components/Cards/Card";
import { BounceLoader } from "react-spinners";
import Searchbar from "@/components/Searchbar";

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
    <div className="min-h-screen ">
      {/* Responsive Sidebar */}
      <Sidebar />
      <div className="md:ml-66  md:pt-6 px-2 md:px-6">
        <div className="mb-2 hidden md:block">
          <Searchbar/>
        </div>
        <h1 className="font-bold text-2xl md:text-3xl text-[#E50914] mb-4">Platforms</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {platforms.map((platform) => (    
            <Card slug={platform.id}  title={platform.name}  type="platforms"  image={platform.image_background}/> 
          ))}
        </div>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <BounceLoader color="red"/>
          </div>
        )}
      </div>
    </div>
  )
}

export default Platforms
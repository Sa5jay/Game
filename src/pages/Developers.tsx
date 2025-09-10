import Card from '@/components/Cards/Card';
import Searchbar from '@/components/Searchbar';
import Sidebar from '@/components/Sidebar'
import React, { useState } from 'react'
import { BounceLoader } from 'react-spinners'

interface Props{
  id: number;
  name: string;
  image_background: string;
  slug: string;
}

const Developers = () => {
  const [developers, setDevelopers] = useState<Props[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchdevelopers = async () => {
    if(loading) return;
    setLoading(true);
    const res = await fetch(
      `https://api.rawg.io/api/developers?key=${import.meta.env.VITE_API_KEY}`
    );
    const data = await res.json();
    setDevelopers(data.results);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchdevelopers();
  }, []);

  return (
    <div className="min-h-screen ">
      <Sidebar />
      <div className="md:ml-66  md:pt-6 px-2 md:px-6">
        <div className='mb-2'>
          <Searchbar/>
        </div>
        <h1 className="font-bold text-3xl md:text-6xl text-[#E50914] mb-4">
          Developers
        </h1>
        <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {developers.map((developer) => (
            <Card key={developer.id} title={developer.name} type='developers' slug={developer.slug} image={developer.image_background}/>
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

export default Developers
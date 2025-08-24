import GenresCard from '@/components/Cards/GenresCard';
import Sidebar from '@/components/Sidebar'
import React, { useState } from 'react'
interface Props{
  id: number;
  name: string;
  image_background: string;
}

const Genres = () => {
  const [genres, setGenres] = useState<Props[]>([]);
  const fetchgenres = async () => {
    const res = await fetch(
      `https://api.rawg.io/api/genres?key=${import.meta.env.VITE_API_KEY}`
    );
    const data = await res.json();
    setGenres(data.results);
  };

  React.useEffect(() => {
    fetchgenres();
  }, []);

  return (
    <div className='grid grid-cols-12 min-h-screen gap-6 p-6'>
       <div className='min-h-screen col-span-2'>
          <Sidebar   />
        </div>
        <div className='col-span-10 ml-3'>
          <h1 className='font-bold text-6xl text-amber-200 mb-4'>
            Genres
          </h1>
          <div className='flex flex-wrap gap-4'>
            {genres.map((genre) => (
            <GenresCard key={genre.id} title={genre.name}  image={genre.image_background}/>
          ))}
          </div>
          
        </div>
    </div>
  )
}

export default Genres
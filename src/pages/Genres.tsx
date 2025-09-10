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

const Genres = () => {
  const [genres, setGenres] = useState<Props[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchgenres = async ( ) => {
    if(loading) return;
    setLoading(true);
    const res = await fetch(
      `https://api.rawg.io/api/genres?key=${import.meta.env.VITE_API_KEY}&page_size=40`
    );
    const data = await res.json();
    setGenres(data.results);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchgenres();
  }, []);

  return (
    <div className="min-h-screen ">
      <Sidebar />
      <div className="md:ml-66  md:pt-6 px-2 md:px-6">
        <div className='mb-2'>
          <Searchbar/>
        </div>
        <h1 className="font-bold text-3xl md:text-6xl text-[#E50914] mb-4">
          Genres
        </h1>
        <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <Card key={genre.id} title={genre.name} type='genres' slug={genre.slug} image={genre.image_background}/>
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

export default Genres
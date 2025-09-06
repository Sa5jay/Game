import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import GameCard from "./Cards/GameCard";
import Sidebar from "./Sidebar";

interface Game {
  id: number;
  background_image: string;
  name: string;
}

interface Details {
  name: string;
  slug?: string;
  description: string;
  description_raw?: string;
  image_background?: string;
}

const Description = () => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const location = useLocation();
  const type = location.pathname.split("/")[1]; 

  const [details, setDetails] = useState<Details | null>(null);
  const [games, setGames] = useState<Game[]>([]);

  const fetchDetails = async () => {
    try {
      const url =
        type === "platforms" || type === "stores"
          ? `https://api.rawg.io/api/${type}/${id}?key=${import.meta.env.VITE_API_KEY}`
          : `https://api.rawg.io/api/${type}/${slug}?key=${import.meta.env.VITE_API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();
      setDetails(data);
    } catch (err) {
      console.error(`Error fetching ${type} details`, err);
    }
  };

  const fetchGames = async () => {
    try {
      const url =
        type === "platforms" || type === "stores"
          ? `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&${type}=${id}&page_size=40`
          : `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&${type}=${slug}&page_size=40`;

      const res = await fetch(url);
      const data = await res.json();
      setGames(data.results);
    } catch (err) {
      console.error(`Error fetching ${type} games`, err);
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchGames();
  }, [slug, id, type]);

  return (
    <div className="grid grid-cols-12 min-h-screen gap-6 p-6 ml-3">
      <div className="hidden 2xl:block col-span-2">
        <Sidebar />
      </div>
      <div className="2xl:col-span-10">
        {details && (
          <div style={{ backgroundImage: `url(${details.image_background} )` }} className="bg-cover  bg-center rounded-lg  mb-6 shadow-lg" >
            <div className="inset-0 overflow-hidden rounded-lg bg-black/80 p-6">
              <h1 className="text-5xl   font-bold  text-amber-200 mb-2">
              {details.name}
            </h1>
            <p className="text-white text-lg mb-4">{details.description.replace(/<[^>]+>/g, '')}</p>
            </div>
            
          </div>
        )}
        <h1 className="text-white mb-3 font-bold text-3xl">Related games :</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
          {games.map((game) => (
            <GameCard
              id={game.id}
              bgImage={game.background_image}
              title={game.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;

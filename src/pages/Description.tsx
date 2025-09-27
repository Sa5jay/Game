import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import GameCard from "../components/Cards/GameCard";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import ThemeToggle from "@/components/ThemeToggle";

interface Game {
  id: number;
  background_image: string;
  name: string;
  rating: number; 
  released: string; 
  genres: { id: number; name: string }[]; 
  platforms: { platform: { id: number; name: string } }[];
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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <Sidebar />
      <div className="md:ml-66 md:pt-4 px-2 md:px-6">
        <div className="mb-3  hidden md:block">
          <div className="flex gap-5 items-center">
            <Searchbar />
          <ThemeToggle />
          </div>
        </div>

        {details && (
          <div
            style={{ backgroundImage: `url(${details.image_background})` }}
            className="bg-cover bg-center rounded-lg mb-6 shadow-lg"
          >
            <div className="inset-0 overflow-hidden rounded-lg bg-white/80 dark:bg-black/80 p-4 md:p-6 transition-colors">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#E50914] mb-2">
                {details.name}
              </h1>
              <p className="text-black dark:text-white text-sm sm:text-base md:text-lg mb-4">
                {details.description.replace(/<[^>]+>/g, '')}
              </p>
            </div>
          </div>
        )}

        <h1 className="text-black dark:text-white mb-3 font-bold text-xl sm:text-2xl md:text-3xl">
          Related games :
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-2">
          {games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              bgImage={game.background_image}
              title={game.name}
              rating={game.rating}
              released={game.released}
              genres={game.genres || []}
              platforms={game.platforms || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Searchbar from "@/components/Searchbar";
import GameCard from "@/components/Cards/GameCard";
import ThemeToggle from "@/components/ThemeToggle";

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: { id: number; name: string }[];
  platforms: { platform: { id: number; name: string } }[];
}

const SearchResults = () => {
  const { query } = useParams<{ query: string }>();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&search=${query}&page_size=40`
      );
      const data = await res.json();
      setGames(data.results || []);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
  <Sidebar />
  <div className="md:ml-66 md:pt-4 px-2 md:px-6">
    <div className="mb-3 hidden md:block">
      <div className="flex gap-5 items-center">
            <Searchbar />
          <ThemeToggle />
          </div>
    </div>

    <h1 className="mb-3 font-bold text-xl sm:text-2xl md:text-3xl">
      Search results for: <span className="text-[#E50914]">{query}</span>
    </h1>

    {loading ? (
      <p className="text-gray-500 dark:text-gray-400">Loading...</p>
    ) : games.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
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
    ) : (
      <p className="text-gray-500 dark:text-gray-400">No results found.</p>
    )}
  </div>
</div>

  );
};

export default SearchResults;

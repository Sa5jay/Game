import { useState, useEffect } from "react";
import SideBar from "@/components/Sidebar";
import Searchbar from "@/components/Searchbar";
import Body from "@/components/body";
import Upcoming from "@/components/Cards/UpcomingCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number; // optional
  released: string; // optional
  genres: { id: number; name: string }[];
  platforms: { platform: { id: number; name: string } }[];
}

const Home = () => {
  const [allgames, setAllGames] = useState<Game[]>([]);
  const [newgames, setNewGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllGames = async () => {
    setLoading(true);
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&page_size=24`
    );
    const data = await res.json();
    setAllGames(data.results);
    setLoading(false);
  };

  const fetchNewGames = async () => {
    setLoading(true);
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=2025-09-01,2025-12-31&ordering=-added&page_size=12`
    );
    const data = await res.json();
    setNewGames(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllGames();
    fetchNewGames();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <SideBar />
      <div className="md:ml-70 md:pt-4 px-2 md:px-4">
        <Searchbar />

        <div className="mt-4">
          <h1 className="text-amber-200 text-2xl md:text-4xl font-bold mb-2">
            Upcoming Games
          </h1>
          <div className="overflow-x-auto min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 pb-3">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 box-border w-[92vw] sm:w-[60vw] md:w-[38vw] lg:w-[28vw] xl:w-[22vw] max-w-[500px]"
                    >
                      <Skeleton className="h-[180px] w-full md:h-[250px] rounded-lg" />
                    </div>
                  ))
                : newgames.map((game) => (
                    <div
                      key={game.id}
                      className="flex-shrink-0 box-border w-[82vw] sm:w-[60vw] md:w-[38vw] lg:w-[28vw] xl:w-[22vw] max-w-[500px]"
                    >
                      <Upcoming
                        backgroundImage={game.background_image}
                        title={game.name}
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>

        <Body allgames={allgames} onMainClick={fetchAllGames} />
      </div>
    </div>
  );
};

export default Home;
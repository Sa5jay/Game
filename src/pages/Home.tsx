import { useState, useEffect } from "react";
import SideBar from "@/components/Sidebar";
import Searchbar from "@/components/Searchbar";
import Body from "@/components/body";
import Upcoming from "@/components/Cards/UpcomingCard";

interface Game {
  id: number;
  name: string;
  background_image: string;
}

const Home = () => {
  const [allgames, setAllGames] = useState<Game[]>([]);
  const [newgames, setNewGames] = useState<Game[]>([]);


  const fetchAllGames = async () => {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&page_size=24`
    );
    const data = await res.json();
    setAllGames(data.results);
  };

  const fetchNewGames = async () => {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=2024-01-01,2025-12-31&ordering=-added&page_size=12`
    );
    const data = await res.json();
    setNewGames(data.results);
  };

  useEffect(() => {
    fetchAllGames();
    fetchNewGames();
  }, []);

  return (
    <div className="grid grid-cols-12 min-h-screen gap-6 p-6">
      <div className="hidden 2xl:block col-span-2">
        <SideBar  />
      </div>
      

      <div className="2xl:col-span-10 ml-0 2xl:ml-4">
        
        <div className="w-full flex items-center justify-between ">
          <Searchbar />
        </div>

        <div className="mt-5">
          <h1 className="text-amber-200 text-4xl font-bold">Upcoming Games</h1>

        {/* Upcoming Games Row */}
        <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4 pb-4 justify-center 2xl:justify-start">
            {newgames.map((game) => (
              <div key={game.id} className="flex-shrink-0 min-w-[300px]">
                <Upcoming
                  backgroundImage={game.background_image}
                  title={game.name}
                />
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* All Games */}
        <Body allgames={allgames} onMainClick={fetchAllGames} />
      </div>
    </div>
  );
};

export default Home;

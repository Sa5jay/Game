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
  rating: number;
  released: string;
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
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&page_size=40`
    );
    const data = await res.json();
    setAllGames(data.results || []);
    setLoading(false);
  };

  const fetchNewGames = async () => {
    setLoading(true);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // start = tomorrow

    const nextYear = new Date(tomorrow);
    nextYear.setFullYear(tomorrow.getFullYear() + 1); // end = same day next year

    const formatDate = (date: Date) => date.toISOString().split("T")[0];
    const startDate = formatDate(tomorrow);
    const endDate = formatDate(nextYear);

    const res = await fetch(
      `https://api.rawg.io/api/games?key=${
        import.meta.env.VITE_API_KEY
      }&dates=${startDate},${endDate}&ordering=-added&page_size=40`
    );

    const data = await res.json();
    setNewGames(data.results || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllGames();
    fetchNewGames();
  }, []);

  return (
    <div className="min-h-screen">
      <SideBar />
      <div className="md:ml-70 md:pt-4 px-2 md:px-4">
        <Searchbar />

        {/* Upcoming Games Section */}
        <div className="mt-2">
          <div className="flex items-center flex-wrap gap-2">
            <h1 className="text-[#E50914] text-2xl md:text-4xl font-bold mb-2">
              Upcoming Games
            </h1>
          </div>

          {/* Games Carousel */}
          <div className="overflow-x-auto min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 pb-3">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 box-border w-[92vw] border-white border rounded-lg sm:w-[60vw] md:w-[38vw] lg:w-[28vw] xl:w-[22vw] max-w-[500px]"
                  >
                    <Skeleton className="h-[180px] w-full md:h-[250px] rounded-lg" />
                  </div>
                ))
              ) : newgames.length === 0 ? (
                <p className="text-gray-400 text-sm px-2">
                  No upcoming games found.
                </p>
              ) : (
                newgames.map((game) => (
                  <div
                    key={game.id}
                    className="flex-shrink-0 box-border w-[82vw] sm:w-[60vw] md:w-[38vw] lg:w-[28vw] xl:w-[22vw] max-w-[500px]"
                  >
                    <Upcoming
                      backgroundImage={game.background_image}
                      released={game.released}
                      title={game.name}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Main body */}
        <Body allgames={allgames} onMainClick={fetchAllGames} />
      </div>
    </div>
  );
};

export default Home;

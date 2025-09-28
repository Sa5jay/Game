import { useState, useEffect } from "react";
import SideBar from "@/components/Sidebar";
import Searchbar from "@/components/Searchbar";
import Upcoming from "@/components/Cards/UpcomingCard";
import GameCard from "@/components/Cards/GameCard";
import { Skeleton } from "@/components/ui/skeleton";
import ThemeToggle from "@/components/ThemeToggle";
import { BounceLoader } from "react-spinners";
import YearDropdown from "@/components/Dropdown/YearDropDown";
import OrderByDropdown from "@/components/Dropdown/OrderByDropDown";

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

  // ----- Body State -----
  const [gamesToShow, setGamesToShow] = useState<Game[]>([]);
  const [activeTab, setActiveTab] = useState<"main" | "best" | "alltime">("main");
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [orderBy, setOrderBy] = useState<string>("");

  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

  // ----- Fetch Functions -----
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
    tomorrow.setDate(today.getDate() + 1);

    const nextYear = new Date(tomorrow);
    nextYear.setFullYear(tomorrow.getFullYear() + 1);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];
    const startDate = formatDate(tomorrow);
    const endDate = formatDate(nextYear);

    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=${startDate},${endDate}&ordering=-added&page_size=40`
    );

    const data = await res.json();
    setNewGames(data.results || []);
    setLoading(false);
  };

  const fetchBestOfYear = async (year: number) => {
    setActiveTab("best");
    setLoading(true);
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=${year}-01-01,${year}-12-31&ordering=-rating&page_size=10`
    );
    const data = await res.json();
    setGamesToShow(data.results);
    setLoading(false);
  };

  const fetchAllTimeTop = async () => {
    setActiveTab("alltime");
    setLoading(true);
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&ordering=-rating&page_size=40`
    );
    const data = await res.json();
    setGamesToShow(data.results);
    setLoading(false);
  };

  // ----- Tab Handlers -----
  const onMainClickHandler = () => {
    setActiveTab("main");
    setGamesToShow(allgames);
  };

  // ----- Effects -----
  useEffect(() => {
    fetchAllGames();
    fetchNewGames();
  }, []);

  useEffect(() => {
    if (activeTab === "best") {
      fetchBestOfYear(selectedYear);
    }
  }, [selectedYear]);

  useEffect(() => {
    if (activeTab === "main") {
      let sortedGames = [...allgames];

      if (orderBy === "rating") {
        sortedGames.sort((a, b) => b.rating - a.rating);
      } else if (orderBy === "released") {
        sortedGames.sort(
          (a, b) => new Date(b.released).getTime() - new Date(a.released).getTime()
        );
      } else if (orderBy === "name") {
        sortedGames.sort((a, b) => a.name.localeCompare(b.name));
      }

      setGamesToShow(sortedGames);
    }
  }, [allgames, activeTab, orderBy]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <SideBar />
      <div className="md:ml-70 md:pt-4 px-2 md:px-4">
        {/* Search + Theme Toggle */}
        <div className="hidden md:block">
          <div className="flex gap-5 items-center">
            <Searchbar />
            <ThemeToggle />
          </div>
        </div>

        {/* Upcoming Games Section */}
        <div className="mt-2">
          <div className="flex items-center mb-2 flex-wrap gap-2">
            <h1 className="text-[#E50914] text-lg md:text-3xl font-semibold mb-2">
              Upcoming Games
            </h1>
          </div>

          <div className="overflow-x-auto min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 pb-3">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 box-border w-[92vw] border-black dark:border-white border rounded-lg sm:w-[60vw] md:w-[38vw] lg:w-[28vw] xl:w-[22vw] max-w-[500px]"
                  >
                    <Skeleton className="h-[180px] w-full md:h-[250px] rounded-lg" />
                  </div>
                ))
              ) : newgames.length === 0 ? (
                <p className="text-black dark:text-white text-sm px-2">
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

        {/* ----- Main Body Section ----- */}
        <div className="mt-4">
          {/* Tabs */}
          <div className="flex text-md gap-5 w-full font-semibold justify-start items-center">
            <button
              onClick={onMainClickHandler}
              className={`hover:cursor-pointer ${
                activeTab === "main"
                  ? "text-[#E50914]"
                  : "text-black dark:text-white hover:text-gray-400 dark:hover:text-gray-600"
              }`}
            >
              Main
            </button>

            <button
              onClick={() => fetchBestOfYear(selectedYear)}
              className={`hover:cursor-pointer ${
                activeTab === "best"
                  ? "text-[#E50914]"
                  : "text-black dark:text-white hover:text-gray-400 dark:hover:text-gray-600"
              }`}
            >
              Best of the Year
            </button>

            <button
              onClick={fetchAllTimeTop}
              className={`hover:cursor-pointer ${
                activeTab === "alltime"
                  ? "text-[#E50914]"
                  : "text-black dark:text-white hover:text-gray-400 dark:hover:text-gray-600"
              }`}
            >
              All time top
            </button>
          </div>

          {/* Dropdowns */}
          <div className="mt-3">
            {activeTab === "main" && (
              <OrderByDropdown orderBy={orderBy} setOrderBy={setOrderBy} />
            )}

            {activeTab === "best" && (
              <YearDropdown
                years={years}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
              />
            )}
          </div>

          {/* Games Grid */}
          {loading ? (
            <div className="flex justify-center mt-10 items-center">
              <BounceLoader color="red" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-4 gap-3">
              {gamesToShow.length === 0
                ? Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="relative border border-black dark:border-white w-full h-[300px] shadow-lg overflow-hidden mt-1 rounded-xl transition-colors"
                    >
                      <Skeleton className="w-full h-40 border-white dark:border-black border rounded-t-xl" />
                      <div className="p-2 space-y-2">
                        <Skeleton className="h-5 w-[70%] border-white dark:border-black border rounded" />
                        <div className="flex gap-5">
                          <Skeleton className="h-4 w-[50px] border-white dark:border-black border rounded" />
                          <Skeleton className="h-4 w-[70px] border-white dark:border-black border rounded" />
                        </div>
                      </div>
                    </div>
                  ))
                : gamesToShow.map((game) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

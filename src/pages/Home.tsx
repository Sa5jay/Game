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
  const [bestOfYear, setBestOfYear] = useState<Game[]>([]);
  const [allTimeTop, setAllTimeTop] = useState<Game[]>([]);
  const [gamesToShow, setGamesToShow] = useState<Game[]>([]);

  const [activeTab, setActiveTab] = useState<"main" | "best" | "alltime">("main");
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [orderBy, setOrderBy] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

  // 🔹 Fetch all required data at once when the site opens
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const nextYear = new Date(tomorrow);
      nextYear.setFullYear(tomorrow.getFullYear() + 1);

      const formatDate = (date: Date) => date.toISOString().split("T")[0];
      const startDate = formatDate(tomorrow);
      const endDate = formatDate(nextYear);

      const [allRes, newRes, bestRes, allTimeRes] = await Promise.all([
        fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&page_size=40`),
        fetch(
          `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=${startDate},${endDate}&ordering=-added&page_size=40`
        ),
        fetch(
          `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=${selectedYear}-01-01,${selectedYear}-12-31&ordering=-rating&page_size=10`
        ),
        fetch(
          `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&ordering=-rating&page_size=40`
        ),
      ]);

      const [allData, newData, bestData, allTimeData] = await Promise.all([
        allRes.json(),
        newRes.json(),
        bestRes.json(),
        allTimeRes.json(),
      ]);

      setAllGames(allData.results || []);
      setNewGames(newData.results || []);
      setBestOfYear(bestData.results || []);
      setAllTimeTop(allTimeData.results || []);

      // Default view = main
      setGamesToShow(allData.results || []);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Load all data once
  useEffect(() => {
    fetchInitialData();
  }, []);

  // 🔹 Handle sorting for Main tab
  useEffect(() => {
    if (activeTab === "main" && allgames.length > 0) {
      const sortedGames = [...allgames];

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
  }, [orderBy, activeTab, allgames]);

  // 🔹 Handle year change for Best of Year tab
  useEffect(() => {
    const fetchBestOfYear = async (year: number) => {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=${year}-01-01,${year}-12-31&ordering=-rating&page_size=10`
      );
      const data = await res.json();
      setBestOfYear(data.results || []);
      if (activeTab === "best") setGamesToShow(data.results || []);
    };

    if (activeTab === "best") fetchBestOfYear(selectedYear);
  }, [selectedYear, activeTab]);

  // 🔹 Tab Handlers
  const handleTabChange = (tab: "main" | "best" | "alltime") => {
    setActiveTab(tab);
    if (tab === "main") setGamesToShow(allgames);
    else if (tab === "best") setGamesToShow(bestOfYear);
    else if (tab === "alltime") setGamesToShow(allTimeTop);
  };

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

        {/* 🔹 Upcoming Games Section */}
        <div className="mt-2">
          <h1 className="text-[#E50914] text-lg md:text-3xl font-semibold mb-2">
            Upcoming Games
          </h1>

          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 pb-3">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[82vw] sm:w-[60vw] md:w-[38vw] lg:w-[28vw] xl:w-[22vw] max-w-[500px]"
                  >
                    <Skeleton className="h-[180px] md:h-[250px] rounded-lg" />
                  </div>
                ))
              ) : newgames.length === 0 ? (
                <p className="text-sm px-2">No upcoming games found.</p>
              ) : (
                newgames.map((game) => (
                  <div
                    key={game.id}
                    className="flex-shrink-0 w-[82vw] sm:w-[60vw] md:w-[38vw] lg:w-[28vw] xl:w-[22vw] max-w-[500px]"
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

        {/* 🔹 Tabs Section */}
        <div className="mt-4">
          <div className="flex text-md gap-5 font-semibold">
            <button
              onClick={() => handleTabChange("main")}
              className={activeTab === "main" ? "text-[#E50914]" : "hover:text-gray-400"}
            >
              Main
            </button>
            <button
              onClick={() => handleTabChange("best")}
              className={activeTab === "best" ? "text-[#E50914]" : "hover:text-gray-400"}
            >
              Best of the Year
            </button>
            <button
              onClick={() => handleTabChange("alltime")}
              className={activeTab === "alltime" ? "text-[#E50914]" : "hover:text-gray-400"}
            >
              All Time Top
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

          {/* 🔹 Game Grid */}
          {loading ? (
            <div className="flex justify-center mt-10 items-center">
              <BounceLoader color="red" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-4 gap-3">
              {gamesToShow.length === 0 ? (
                <p className="col-span-full text-center">No games found.</p>
              ) : (
                gamesToShow.map((game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    bgImage={game.background_image}
                    title={game.name}
                    rating={game.rating}
                    released={game.released}
                    genres={game.genres}
                    platforms={game.platforms}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

import GameCard from "./Cards/GameCard"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton";
import { BounceLoader } from "react-spinners";

interface Props {
  background_image: string;
  name: string;
  id: number;
  rating: number;
  released: string;
  genres: { id: number; name: string }[];
  platforms: { platform: { id: number; name: string } }[];
}

interface BodyProps {
  allgames: Props[];
  onMainClick: () => void;
}

const Body = ({ onMainClick, allgames }: BodyProps) => {
  const [gamesToShow, setGamesToShow] = useState<Props[]>([]);
  const [activeTab, setActiveTab] = useState<"main" | "best" | "alltime">("main");
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "main") {
      setGamesToShow(allgames);
    }
  }, [allgames, activeTab]);

  const fetchBestOfYear = async (year: number) => {
    setActiveTab("best");
    setLoading(true);
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=${year}-01-01,${year}-12-31&ordering=-rating&page_size=40`
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

  const onMainClickHandler = () => {
    setActiveTab("main");
    setGamesToShow(allgames);
    onMainClick();
  };

  useEffect(() => {
    if (activeTab === "best") {
      fetchBestOfYear(selectedYear);
    }
  }, [selectedYear]);
  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);
  return (
    <>
      <div className="flex text-sm gap-5 w-full font-semibold justify-start items-center">
  <button
    onClick={onMainClickHandler}
    className={`hover:cursor-pointer ${
      activeTab === "main"
        ? "text-[#E50914]"
        : "text-white dark:text-black hover:text-gray-400 dark:hover:text-gray-600"
    }`}
  >
    Main
  </button>

  <button
    onClick={() => fetchBestOfYear(selectedYear)}
    className={`hover:cursor-pointer ${
      activeTab === "best"
        ? "text-[#E50914]"
        : "text-white dark:text-black hover:text-gray-400 dark:hover:text-gray-600"
    }`}
  >
    Best of the Year
  </button>

  <button
    onClick={fetchAllTimeTop}
    className={`hover:cursor-pointer ${
      activeTab === "alltime"
        ? "text-[#E50914]"
        : "text-white dark:text-black hover:text-gray-400 dark:hover:text-gray-600"
    }`}
  >
    All time top
  </button>
</div>

{activeTab === "best" && (
  <div className="flex justify-start mt-4">
    <select
      value={selectedYear}
      onChange={(e) => setSelectedYear(parseInt(e.target.value))}
      className="text-white dark:text-black border bg-black dark:bg-white border-[#111] dark:border-gray-400 hover:cursor-pointer rounded px-3 py-2"
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
)}

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

    </>
  );
};

export default Body; 
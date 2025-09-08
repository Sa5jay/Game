import GameCard from "./Cards/GameCard"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton";
import { BounceLoader } from "react-spinners";

interface Props {
  background_image: string;
  name: string;
  id: number;
  rating: number; // optional
  released: string; // optional
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

  // keep gamesToShow in sync with allgames
  useEffect(() => {
    if (activeTab === "main") {
      setGamesToShow(allgames);
    }
  }, [allgames, activeTab]);

  const fetchBestOfYear = async (year: number) => {
    setLoading(true);
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=${year}-01-01,${year}-12-31&ordering=-rating&page_size=40`
    );
    const data = await res.json();
    setActiveTab("best");
    setGamesToShow(data.results);
    setLoading(false);
  };

  const fetchAllTimeTop = async () => {
    setLoading(true);
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&ordering=-metacritic&page_size=40`
    );
    const data = await res.json();
    setActiveTab("alltime");
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

  // Years dropdown list (last 10 years)
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  return (
    <>
      {/* Tabs */}
      <div className="flex text-white text-md gap-5 w-full border-b border-gray-700 justify-start items-center">
        <button
          onClick={onMainClickHandler}
          className={`hover:border-t hover:border-gray-100 hover:cursor-pointer 
            ${activeTab === "main" ? "text-[#E50914]" : "text-white"} `}
        >
          Main
        </button>

        <button
          onClick={() => fetchBestOfYear(selectedYear)}
          className={`hover:border-t hover:border-gray-100 hover:cursor-pointer 
            ${activeTab === "best" ? "text-[#E50914]" : "text-white"} `}
        >
          Best of the Year
        </button>

        <button
          onClick={fetchAllTimeTop}
          className={`hover:border-t hover:border-gray-100 hover:cursor-pointer 
            ${activeTab === "alltime" ? "text-[#E50914]" : "text-white"} `}
        >
          All time top
        </button>
      </div>

      {activeTab === "best" && (
        <div className="flex justify-start mt-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="bg-[#E50914] text-white border border-[#E50914] rounded px-3 py-2"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}



{loading ? <div className="flex justify-center items-center"><BounceLoader color="red"/></div> : 

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-4 gap-3">
    {gamesToShow.length === 0
      ? Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="relative bg-[#111111] w-full h-[300px] shadow-lg border overflow-hidden mt-1 rounded-xl"
          >
            <Skeleton className="w-full h-40 rounded-t-xl" />
            <div className="p-2 space-y-2">
              <Skeleton className="h-5 w-[70%] rounded" />
              <div className="flex gap-5">
                <Skeleton className="h-4 w-[50px] rounded" />
                <Skeleton className="h-4 w-[70px] rounded" />
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

}



      
    </>
  );
};

export default Body; 
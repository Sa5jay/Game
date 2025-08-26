import GameCard from "./Cards/GameCard"
import { useState, useEffect } from "react"

interface Props {
  background_image: string;
  name: string;
  id: number;
}

interface BodyProps {
  allgames: Props[];
  onMainClick: () => void;
}

const Body = ({ onMainClick, allgames }: BodyProps) => {
  const [gamesToShow, setGamesToShow] = useState<Props[]>([]);
  const [activeTab, setActiveTab] = useState<"main" | "best" | "alltime">("main");
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // default: current year

  // keep gamesToShow in sync with allgames
  useEffect(() => {
    if (activeTab === "main") {
      setGamesToShow(allgames);
    }
  }, [allgames, activeTab]);

  const fetchBestOfYear = async (year: number) => {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=${year}-01-01,${year}-12-31&ordering=-rating&page_size=40`
    );
    const data = await res.json();
    setActiveTab("best");
    setGamesToShow(data.results);
  };

  const fetchAllTimeTop = async () => {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&ordering=-metacritic&page_size=40`
    );
    const data = await res.json();
    setActiveTab("alltime");
    setGamesToShow(data.results);
  };

  const onMainClickHandler = () => {
    setActiveTab("main");
    setGamesToShow(allgames);
    onMainClick();
  };

  // 👇 re-fetch whenever year changes & tab is "best"
  useEffect(() => {
    if (activeTab === "best") {
      fetchBestOfYear(selectedYear);
    }
  }, [selectedYear]);

  // Years dropdown list (last 10 years)
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div>
      {/* Tabs */}
      <div className="flex text-white text-md gap-5 w-full border-b border-gray-700 justify-start items-center">
        <button
          onClick={onMainClickHandler}
          className={`hover:border-t hover:border-gray-100 hover:cursor-pointer 
            ${activeTab === "main" ? "text-[#E50914]" : "text-white"} hover:text-[#FFCC00]`}
        >
          Main
        </button>

        <button
          onClick={() => fetchBestOfYear(selectedYear)}
          className={`hover:border-t hover:border-gray-100 hover:cursor-pointer 
            ${activeTab === "best" ? "text-[#E50914]" : "text-white"} hover:text-[#FFCC00]`}
        >
          Best of the Year
        </button>

        <button
          onClick={fetchAllTimeTop}
          className={`hover:border-t hover:border-gray-100 hover:cursor-pointer 
            ${activeTab === "alltime" ? "text-[#E50914]" : "text-white"} hover:text-[#FFCC00]`}
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

      {/* Game cards */}
      <div className="flex flex-wrap justify-center mt-4 gap-5">
        {gamesToShow.map((game) => (
          <GameCard
            key={game.id}
            title={game.name}
            bgImage={game.background_image}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;

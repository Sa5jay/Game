import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import GameCard from "./Cards/GameCard";
import { BounceLoader } from "react-spinners";
import Searchbar from "./Searchbar";

interface GameDetailsProps {
  id: number;
  name: string;
  description_raw: string;
  background_image: string;
  released: string;
  playtime: number;
  game_series_count: number;
  ratings_count: number;
  rating: number;
  developers: { name: string }[];
  publishers: { name: string }[];
  platforms: { platform: { id: number; name: string } }[];
  genres: { id: number; name: string }[];
  stores: { store: { id: number; name: string } }[];
  tags: { id: number; name: string }[];
}

interface ScreenshotProps {
  id: number;
  image: string;
}

interface GameSeriesProps {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  platforms: { platform: { id: number; name: string } }[];
}

const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [gameDetails, setGameDetails] = useState<GameDetailsProps | null>(null);
  const [screenShots, setScreenShots] = useState<ScreenshotProps[]>([]);
  const [gameSeries, setGameSeries] = useState<GameSeriesProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_API_KEY}`
        );
        const data = await res.json();
        setGameDetails(data);
      } catch (err) {
        console.error("Error fetching game details", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchScreenShots = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/${id}/screenshots?key=${import.meta.env.VITE_API_KEY}`
        );
        const data = await res.json();
        setScreenShots(data.results || []);
      } catch (err) {
        console.error("Error fetching screenshots", err);
      }
    };

    const fetchGameSeries = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/${id}/game-series?key=${import.meta.env.VITE_API_KEY}`
        );
        const data = await res.json();
        setGameSeries(data.results || []);
      } catch (err) {
        console.error("Error fetching game series", err);
      }
    };

    fetchGameDetails();
    fetchScreenShots();
    fetchGameSeries();
  }, [id]);

  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <div className="md:ml-67  md:pt-4 px-2 sm:px-4 ">
        <div className="mb-3">
          <Searchbar/>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <BounceLoader color="#ffffff" />
          </div>
        ) : (
          <div>
            {/* Banner */}
            <div
              className="relative w-full h-56 sm:h-80 md:h-[450px] bg-cover shadow-md shadow-gray-800 rounded-lg overflow-hidden flex items-center justify-start"
              style={{ backgroundImage: `url(${gameDetails?.background_image})` }}
            >
              <div className="absolute inset-0 bg-black/70"></div>
              <h1 className="relative z-10 text-2xl sm:text-3xl md:text-[40px] font-bold text-white px-4 sm:px-6">
                {gameDetails?.name}
              </h1>
            </div>

            {/* Game Info */}
            <div className="bg-gray-800/70 mt-5 p-4 sm:p-8 rounded-2xl shadow-lg text-white">
              <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Game Info</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                <p className="text-base sm:text-lg">
                  <span className="font-semibold">Average Playtime:</span> {gameDetails?.playtime}h
                </p>
                <p className="text-base sm:text-lg">
                  <span className="font-semibold">Developers:</span>{" "}
                  {gameDetails?.developers.map((d) => d.name).join(", ")}
                </p>
                <p className="text-base sm:text-lg">
                  <span className="font-semibold">Rating:</span> {gameDetails?.rating}/5
                </p>
                <p className="text-base sm:text-lg">
                  <span className="font-semibold">Publishers:</span>{" "}
                  {gameDetails?.publishers.map((p) => p.name).join(", ")}
                </p>
                <p className="text-base sm:text-lg">
                  <span className="font-semibold">Released:</span> {gameDetails?.released}
                </p>
                <p className="text-base sm:text-lg">
                  <span className="font-semibold">Genres:</span>{" "}
                  {gameDetails?.genres.map((g) => g.name).join(", ")}
                </p>
                <p className="text-base sm:text-lg">
                  <span className="font-semibold">Platforms:</span>{" "}
                  {gameDetails?.platforms.map((pl) => pl.platform.name).join(", ")}
                </p>
                <p className="text-base sm:text-lg">
                  <span className="font-semibold">Stores:</span>{" "}
                  {gameDetails?.stores.map((s) => s.store.name).join(", ")}
                </p>
              </div>
            </div>

            {/* About */}
            <div className="text-white w-full mt-6">
              <h2 className="font-bold text-xl sm:text-2xl">About the game:</h2>
              <p className="mt-3 sm:mt-5 text-base sm:text-lg">{gameDetails?.description_raw}</p>
            </div>

            {/* Screenshots */}
            <div className="text-white text-xl sm:text-2xl mt-6">
              <h2>Screenshots:</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-3 sm:gap-5">
                {screenShots.map((s) => (
                  <img
                    key={s.id}
                    src={s.image}
                    alt="screenshot"
                    className="w-full h-28 sm:h-40 md:h-[220px] object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Game series */}
            <div className="text-white text-xl sm:text-2xl mt-6">
              <h2>Game Series:</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-3 sm:gap-4">
                {gameSeries.map((g) => (
                  <GameCard
                    key={g.id}
                    id={g.id}
                    bgImage={g.background_image}
                    title={g.name}
                    rating={g.rating}
                    released={g.released}
                    genres={gameDetails?.genres || []}
                    platforms={g.platforms || []}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetails;
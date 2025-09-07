import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

interface Props {
  id: number;
  bgImage: string;
  title: string;
  rating: number; 
  released: string; 
  genres: { id: number; name: string }[]; 
  platforms: { platform: { id: number; name: string } }[];
}

const GameCard = ({ bgImage, title, id, rating, released, genres,platforms }: Props) => {
  return (
    <div className="relative group bg-[#111111] w-[290px] h-[340px] shadow-lg border hover:border-[#E50914] hover:shadow-[#E50914] overflow-hidden mt-1 rounded-xl transition-all duration-300">

      <img
        src={bgImage}
        alt={title}
        className="w-full h-40 object-cover"
        loading="lazy"
/>
<div className="p-3">
  <Link to={`/game/${id}`}>
    <h1 className="text-white text-lg font-bold truncate">{title}</h1>
  </Link>

  {(rating || released) && (
    <div className="flex justify-between text-sm text-gray-400 mt-1">
      <span className="flex items-center gap-1">
        <FaStar className="text-yellow-400" />
        {rating.toFixed(1)}
      </span>
      <span>{released ? released.split("-")[0] : null}</span>
    </div>
  )}

  {genres && genres.length > 0 && (
    <div className="flex flex-wrap gap-1 mt-2">
      {genres.slice(0, 2).map((g) => (
        <span
          key={g.id}
          className=" text-xs bg-gray-900 text-gray-300 px-1 py-1 rounded"
        >
          {g.name}
        </span>
      ))}
    </div>
  )}
  {platforms && platforms.length > 0 && (
    <div className="flex flex-wrap gap-1 mt-2">
      {platforms.slice(0, 2).map((g) => (
        <span
          key={g.platform.id}
          className="text-xs bg-gray-900 text-gray-300 px-1 py-1 rounded"
        >
          {g.platform.name}
        </span>
      ))}
    </div>
  )}
</div>
    </div>
  );
};

export default GameCard;

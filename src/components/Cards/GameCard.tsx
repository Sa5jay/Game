
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
    <div className=" text-white w-full h-full border border-[#111111] rounded-lg   overflow-hidden   transition-all duration-300">

      <img
        src={bgImage}
        alt={title}
        className="w-full h-40  object-cover"
        loading="lazy"
/>
<div className="p-3">
  <Link to={`/game/${id}`}>
    <h1 className=" text-lg font-bold truncate">{title}</h1>
  </Link>

  {(rating || released) && (
    <div className="flex justify-between text-sm  mt-1">
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
          className=" text-xs text-gray-400 px-1 py-1 rounded"
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
          className="text-xs text-gray-400 px-1 py-1 rounded"
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

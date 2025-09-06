import { Link } from "react-router-dom";

interface Props {
  id:number;
  bgImage: string;
  title: string;
}

const GameCard = ({ bgImage, title,id }: Props) => {
  return (
    <Link to={`/game/${id}`}>
    <div className="relative group bg-[#111111] w-[290px] h-[300px] shadow-lg border hover:border-[#E50914] hover:shadow-[#E50914] overflow-hidden mt-1 rounded-xl transition-all duration-300">
      <img
        src={bgImage}
        alt="Preview"
        className="w-full h-40 object-cover "
      />
      <div className="p-2">
        <h1 className="text-white text-lg font-bold">{title}</h1>
        <div className="flex gap-5">
          <p className="text-gray-400">Year</p>
          <p className="text-gray-400">Genre</p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default GameCard;

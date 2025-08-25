import GameCard from "./Cards/GameCard"

interface Props {
  background_image:string;
  name:string;
  id:number;
}

interface BodyProps {
  allgames: Props[];
  onMainClick: () => void;
}

const Body = ({ onMainClick, allgames }: BodyProps) => {
  return (
    <div>
      <div className="flex text-amber-200 text-md gap-5 w-full border-b border-gray-700 justify-center items-center">
        <button
          onClick={onMainClick}
          className="hover:border-t hover:border-gray-100 hover:text-gray-50 hover:cursor-pointer"
        >
        Main
        </button>
        <button 
        className="hover:border-t hover:border-gray-100 hover:text-gray-50 hover:cursor-pointer"
        >
        Best of the year
        </button>
        <button 
        className="hover:border-t hover:border-gray-100 hover:text-gray-50  hover:cursor-pointer"
        >
        All time top
        </button>
      </div>
      <div className="flex flex-wrap justify-center mt-2 gap-3">
        {allgames.map((game) => (
            <GameCard
            key={game.id}   
            title={game.name}
            bgImage={game.background_image}
          />
          
        ))}
    </div>
    </div>
  )}


export default Body

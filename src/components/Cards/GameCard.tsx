

interface Props {
  bgImage: string;
  title: string;
}

const GameCard = ({bgImage,title}:Props) => {
  return (
      <div className="bg-[#111111] w-[290px] h-[300px] shadwo-lg border hover:border-[#E50914]  hover:shadow-[#E50914] overflow-hidden mt-1 rounded-xl  shadow-lg">
        <img
          src={bgImage}
          alt="Preview"
          className="w-full   h-50"
        />
        <div className="p-2">
            <h1 className="text-white text-lg font-bold ">{title}</h1>
            <div className="flex gap-5">
              <p className="text-gray-400">year</p>
              <p>genre</p>
            </div>
        </div>
        
      </div>
    
  )
}

export default GameCard


interface Props {
  bgImage: string;
  title: string;
}

const Card = ({bgImage,title}:Props) => {
  return (
      <div className="bg-gray-700 w-[290px] h-[300px] shadwo-lg hover:shadow-amber-200 overflow-hidden mt-1 rounded-xl  shadow-lg">
        <img
          src={bgImage}
          alt="Preview"
          className="w-full   h-50"
        />
        <div className="p-2">
            <h1 className="text-white font-bold ">{title}</h1>
          <p className="text-gray-400">Description of the game</p>
        </div>
        
      </div>
    
  )
}

export default Card
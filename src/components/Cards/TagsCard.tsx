
interface Props { 
    title: string;
    image: string;
    
}


const TagsCard = ({title,image}:Props) => {
  return (
    <div
      className="relative hover:scale-95 hover:shadow-amber-200  transform transition-transform duration-200 h-[230px] w-[280px] text-gray-50 rounded-lg shadow-lg overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center p-4">
        <h2  className="text-2xl font-bold">{title}</h2>
      </div>
    </div>
  )
}

export default TagsCard
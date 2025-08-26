
interface Props {
  backgroundImage: string;
  title: string;
}

const Upcoming: React.FC<Props> = ({ backgroundImage, title }) => {
  return (
    <div className="bg-[#111111] justify-center  2xl:w-[350px]  h-[250px] mt-4 rounded-xl overflow-hidden shadow-lg">
      
      <img
        src={backgroundImage}
        alt="Preview"
        className="w-full object-cover h-50"
      />
      <div className="p-3 flex items-center justify-between text-gray-500 ">
        <h2 className=" font-bold  ">{title}</h2>
      </div>
    </div>




  )
}

export default Upcoming
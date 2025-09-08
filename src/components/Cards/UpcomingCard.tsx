interface Props {
  backgroundImage: string;
  title: string;
}

const Upcoming: React.FC<Props> = ({ backgroundImage, title }) => {
  return (
    <div className="bg-[#111111] flex flex-col h-full w-full rounded-xl overflow-hidden shadow-lg">
      <img
        src={backgroundImage}
        alt="Preview"
        className="w-full h-48 object-cover flex-shrink-0"
      />
      <div className="p-3 flex-1 flex flex-col items-start text-gray-500">
        <h2 className="font-bold mb-3 w-full line-clamp-2">{title}</h2>
      </div>
    </div>
  );
};

export default Upcoming;
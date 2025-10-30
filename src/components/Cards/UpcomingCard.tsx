interface Props {
  backgroundImage: string;
  title: string;
  released:string;
}

const Upcoming: React.FC<Props> = ({ backgroundImage, title,released }) => {
  return (
<div className="flex flex-col h-full w-full rounded-lg border border-black dark:border-white overflow-hidden bg-white dark:bg-black text-black dark:text-white opacity-0 animate-fade-up">
      <img
        src={backgroundImage}
        alt="Preview"
        className="w-full h-48 object-cover flex-shrink-0 transition-transform duration-200 hover:scale-105"
      />
      <div className="ml-2 flex-1 flex flex-col items-start">
        <h2 className="font-bold mt-1 hover:text-[#E50914] mb-1 w-full line-clamp-2">{title}</h2>
        <span className="mb-1 w-full text-gray-500 dark:text-gray-600 line-clamp-2">
          <span className="mr-2">Releasing on:</span>{released}
        </span>
      </div>
    </div>
  );
};

export default Upcoming;
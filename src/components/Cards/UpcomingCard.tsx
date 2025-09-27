interface Props {
  backgroundImage: string;
  title: string;
  released:string;
}

const Upcoming: React.FC<Props> = ({ backgroundImage, title,released }) => {
  return (
<div className="flex flex-col h-full w-full rounded-lg border border-black dark:border-white overflow-hidden bg-white dark:bg-black text-black dark:text-white">
      <img
        src={backgroundImage}
        alt="Preview"
        className="w-full h-48 object-cover flex-shrink-0"
      />
      <div className="ml-2 flex-1 flex flex-col items-start">
        <h2 className="font-bold mt-1 mb-1 w-full line-clamp-2">{title}</h2>
        <span className="mb-1 w-full text-gray-700 dark:text-gray-300 line-clamp-2">
          <span className="font-bold mr-2">Releasing on:</span>{released}
        </span>
      </div>
    </div>
  );
};

export default Upcoming;
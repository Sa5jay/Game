import { Link } from 'react-router-dom';

interface Props {
  title: string;
  image: string;
  slug: string | number;
  type: "tags" | "genres" | "platforms" | "stores" | "developers";
}

const Card = ({ title, image, slug, type }: Props) => {
  return (
    <Link to={`/${type}/${slug}`}>
  <div
    className="relative hover:scale-95 border border-[#111] dark:border-gray-700 transform transition-transform duration-200 w-full h-40 sm:h-52 md:h-56 rounded-lg shadow-lg overflow-hidden"
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-white/50 dark:bg-black/70 flex flex-col justify-center items-center p-4">
      <h2 className="text-lg sm:text-xl md:text-xl font-bold text-center text-black dark:text-white">
        {title}
      </h2>
    </div>
  </div>
</Link>

  );
};

export default Card;
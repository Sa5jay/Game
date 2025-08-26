import { Link } from 'react-router-dom';

interface Props {
  title: string;
  image: string;
  slug: string | number;   // slug for tags/genres, id for platforms/stores
  type: "tags" | "genres" | "platforms" | "stores"; // NEW
}

const Card = ({ title, image, slug, type }: Props) => {
  return (
    <Link to={`/${type}/${slug}`}>
      <div 
        className="relative hover:scale-90 border hover:border-[#E50914] hover:shadow-[#E50914] transform transition-transform duration-200 h-[230px] w-[280px] text-gray-50 rounded-lg shadow-lg overflow-hidden"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center p-4">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Card;

import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface ResultItem {
  id: number;
  name: string;
  image?: string;
  type: "game" | "genre" | "platform" | "developer" | "store" | "tag";
}

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 2) {
      const fetchAll = async () => {
        try {
          const endpoints = [
            {
              url: `https://api.rawg.io/api/games?key=${
                import.meta.env.VITE_API_KEY
              }&search=${query}&page_size=5`,
              type: "game",
            },
            {
              url: `https://api.rawg.io/api/genres?key=${
                import.meta.env.VITE_API_KEY
              }&search=${query}`,
              type: "genre",
            },
            {
              url: `https://api.rawg.io/api/platforms?key=${
                import.meta.env.VITE_API_KEY
              }&search=${query}`,
              type: "platform",
            },
            {
              url: `https://api.rawg.io/api/developers?key=${
                import.meta.env.VITE_API_KEY
              }&search=${query}`,
              type: "developer",
            },
            {
              url: `https://api.rawg.io/api/stores?key=${
                import.meta.env.VITE_API_KEY
              }&search=${query}`,
              type: "store",
            },
            {
              url: `https://api.rawg.io/api/tags?key=${
                import.meta.env.VITE_API_KEY
              }&search=${query}`,
              type: "tag",
            },
          ];

          const responses = await Promise.all(
            endpoints.map((e) => fetch(e.url).then((r) => r.json()))
          );

          const merged: ResultItem[] = [];

          responses.forEach((res, idx) => {
            if (res.results) {
              res.results.slice(0, 5).forEach((item: any) => {
                merged.push({
                  id: item.id,
                  name: item.name,
                  image: item.background_image || item.image_background,
                  type: endpoints[idx].type as ResultItem["type"],
                });
              });
            }
          });

          setResults(merged);
          setShowDropdown(true);
        } catch (err) {
          console.error("Search error:", err);
        }
      };

      fetchAll();
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
      setShowDropdown(false);
    }
  };

  const handleSelect = (item: ResultItem) => {
    switch (item.type) {
      case "game":
        navigate(`/game/${item.id}`);
        break;
      default:
        navigate(`/${item.type}s/${item.id}`);
        break;
    }
    setShowDropdown(false);
  };

  return (
    <div className="w-full relative" ref={wrapperRef}>
  <form
    onSubmit={handleSubmit}
    className="flex items-center border text-white border-[#111111] rounded-lg px-2 py-1 md:px-4 md:py-3 bg-black"
  >
    <Search className="w-5 h-5 md:w-8 md:h-8 flex-shrink-0" color="#E50914" />
    <input
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full px-2 text-sm md:text-base outline-none bg-transparent"
    />
  </form>

      {showDropdown && results.length > 0 && (
        <div className="absolute left-0 right-0 bg-[#111] border border-gray-600 rounded-lg mt-1 shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="flex items-center gap-3 p-2 hover:bg-[#222] cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded-md"
                />
              )}
              <span className="text-white">{item.name}</span>
              <span className="ml-auto text-xs text-gray-400">
                {item.type}
              </span>
            </div>
          ))}
          <div
            className="p-2 text-sm text-gray-400 hover:text-white hover:bg-[#333] cursor-pointer"
            onClick={() => {
              navigate(`/search/${query}`);
              setShowDropdown(false);
            }}
          >
            See all results for "{query}"
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;

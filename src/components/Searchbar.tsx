import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface ResultItem {
  id: number;
  name: string;
  image?: string;
  type: "game" | "genre" | "platform" | "developer" | "store" | "tag";
}

interface ApiResponse<T> {
  results?: T[];
}

interface ApiResult {
  id: number;
  name: string;
  background_image?: string;
  image_background?: string;
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
              url: `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&search=${query}&page_size=5`,
              type: "game" as ResultItem["type"],
            },
            {
              url: `https://api.rawg.io/api/genres?key=${import.meta.env.VITE_API_KEY}&search=${query}`,
              type: "genre" as ResultItem["type"],
            },
            {
              url: `https://api.rawg.io/api/platforms?key=${import.meta.env.VITE_API_KEY}&search=${query}`,
              type: "platform" as ResultItem["type"],
            },
            {
              url: `https://api.rawg.io/api/developers?key=${import.meta.env.VITE_API_KEY}&search=${query}`,
              type: "developer" as ResultItem["type"],
            },
            {
              url: `https://api.rawg.io/api/stores?key=${import.meta.env.VITE_API_KEY}&search=${query}`,
              type: "store" as ResultItem["type"],
            },
            {
              url: `https://api.rawg.io/api/tags?key=${import.meta.env.VITE_API_KEY}&search=${query}`,
              type: "tag" as ResultItem["type"],
            },
          ];

          // Fetch all endpoints simultaneously
          const responses = await Promise.all(
            endpoints.map(async (endpoint) => {
              const res = await fetch(endpoint.url);
              const data: ApiResponse<ApiResult> = await res.json();
              return { data, type: endpoint.type };
            })
          );

          const merged: ResultItem[] = [];

          responses.forEach(({ data, type }) => {
            data.results?.slice(0, 5).forEach((item) => {
              merged.push({
                id: item.id,
                name: item.name,
                image: item.background_image || item.image_background,
                type,
              });
            });
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="relative w-full" ref={wrapperRef}>
      <form
        onSubmit={handleSubmit}
        className="flex items-center border rounded-lg px-2 py-3 md:px-4 md:py-3
                   bg-white dark:bg-black border-black dark:border-white text-black dark:text-white transition-shadow duration-150 focus-within:shadow-lg"
      >
        <Search className="w-5 h-5 md:w-8 md:h-8 flex-shrink-0 text-[#E50914]" />
        <input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-2 text-sm md:text-base outline-none bg-transparent placeholder-black dark:placeholder-white text-black dark:text-white"
          onFocus={() => setShowDropdown(true)}
        />
      </form>

      {showDropdown && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-black border border-black dark:border-white rounded-lg z-50 max-h-80 overflow-y-auto shadow-lg animate-fade-in">
          {results.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer transition-transform duration-150 hover:translate-x-1"
              onClick={() => handleSelect(item)}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded-md"
                />
              )}
              <span className="text-black dark:text-white">{item.name}</span>
              <span className="ml-auto text-xs text-gray-400">{item.type}</span>
            </div>
          ))}
          <div
            className="p-2 text-sm text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer transition-transform duration-150 hover:translate-x-1"
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

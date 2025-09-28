import { useState, useRef, useEffect } from "react";

interface OrderByDropdownProps {
  orderBy: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
}

const OrderByDropdown = ({ orderBy, setOrderBy }: OrderByDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "", label: "Default" },
    { value: "rating", label: "Rating" },
    { value: "released", label: "Release Date" },
    { value: "name", label: "Name (A-Z)" },
  ];

  const handleSelect = (value: string) => {
    setOrderBy(value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left mt-4" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border border-black dark:border-white rounded-lg text-sm font-medium bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
      >
        Order By:{" "}
        <span className="text-[#E50914] font-semibold">
          {options.find((opt) => opt.value === orderBy)?.label || "Default"}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white dark:bg-black border border-black dark:border-white rounded-lg shadow-lg z-10 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
                orderBy === opt.value ? "text-[#E50914] font-semibold" : "text-black dark:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderByDropdown;

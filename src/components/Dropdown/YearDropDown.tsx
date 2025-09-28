import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface YearDropdownProps {
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

const YearDropdown = ({ years, selectedYear, setSelectedYear }: YearDropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (year: number) => {
    setSelectedYear(year);
    setOpen(false);
  };

  return (
    <div className="relative inline-block w-[100px] mt-4">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex justify-between items-center
          rounded-lg border border-black dark:border-white 
          bg-white dark:bg-black 
          text-black dark:text-white 
          px-4 py-2 shadow-md
          hover:border-[#E50914] 
          transition-colors duration-200
        "
      >
        <span>{selectedYear}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#E50914] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          className="
            absolute left-0 mt-2 w-full max-h-60 overflow-y-auto
            bg-white dark:bg-black 
            border border-black dark:border-white 
            rounded-lg shadow-xl z-10
            animate-in fade-in slide-in-from-top-2
            scrollbar-hide
          "
        >
          {years.map((year) => (
            <li
              key={year}
              onClick={() => handleSelect(year)}
              className={`
                px-4 py-2 cursor-pointer 
                hover:bg-[#E50914]/10 dark:hover:bg-[#E50914]/20
                transition-colors duration-200
                ${selectedYear === year ? "text-[#E50914] font-semibold" : ""}
              `}
            >
              {year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YearDropdown;

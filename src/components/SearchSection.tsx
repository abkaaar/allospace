import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import data from "../data.json";
import { Search } from "lucide-react";

interface SearchSectionProps {
  className?: string; // Optional prop for additional styling
}

const SearchSection: React.FC<SearchSectionProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setDropdownVisible(inputValue.length > 0);
  };

  const onSearch = (searchTerm: string) => {
    setValue(searchTerm);
    setDropdownVisible(false);
    navigate(`/search?city=${encodeURIComponent(searchTerm)}`);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <div className="search-box flex flex-col justify-center w-fit">
      <form className="gap-1 rounded-md flex" onSubmit={handleFormSubmit}>
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Type in a city or area"
            className={`p-3 pl-10 rounded-md shrink bg-white ${className}`}
            value={value}
            onChange={handleOnChange}
          />
        </div>
      </form>

      {isDropdownVisible && (
        <div className="absolute top-20 bg-white p-3 z-50 w-fit shadow-md rounded-md">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const city = item.city.toLowerCase();
              return searchTerm && city.startsWith(searchTerm) && city !== searchTerm;
            })
            .slice(0, 10)
            .map((item) => (
              <div
                key={item.city}
                onClick={() => onSearch(item.city)}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {item.city}, {item.state} state
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchSection;

import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import data from "../data.json";
import { Search } from "lucide-react";
import { states } from "@/constants/states";

interface SearchSectionProps {
  className?: string; // Optional prop for additional styling
  onSearchSubmit?: (searchTerm: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  className = "",
  onSearchSubmit,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchValue = queryParams.get("city") || "";

  const [value, setValue] = useState(initialSearchValue);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setDropdownVisible(inputValue.length > 0);
  };

  const onSearch = (searchTerm: string) => {
    setValue(searchTerm);
    setDropdownVisible(false);
    // If onSearchSubmit is provided (for search page), use it
    if (onSearchSubmit) {
      onSearchSubmit(searchTerm);
    } else {
      // Otherwise, navigate to search page
      navigate(`/search?city=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(value);
  };
  const filter = (options: Array<any>) => {
    return options.filter(
      (option) =>
        option["state"].toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  };

  function toggle(e: any) {
    setDropdownVisible(e && e.target === inputRef.current);
  }

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  return (
    <div className="search-box flex flex-col justify-center w-fit border  rounded-md ">
      <form className="gap-1 rounded-md flex" onSubmit={handleFormSubmit}>
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Type in a city or area"
            className={`p-3 pl-10 rounded-md shrink bg-white focus:outline-none focus:ring-0 focus:border-2 border-green-700 ${className}`}
            value={value}
            onChange={handleOnChange}
          />
          <div className={`options ${isDropdownVisible ? "open" : ""}`}>
            {filter(states).map((option, index) => {
              return (
                <div
                  onClick={() => setValue(option.state)}
                  className={`option ${
                    option["state"] === value ? "selected" : ""
                  }`}
                  key={`${index}`}
                >
                  {option["state"]}
                </div>
              );
            })}
          </div>
        </div>
      </form>

      {/* {isDropdownVisible && (
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
      )} */}

      {/* {isDropdownVisible && (
        <div className="absolute top-full bg-white p-3 z-50 w-full shadow-md rounded-md">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const city = item.city.toLowerCase();
              return (
                searchTerm && city.startsWith(searchTerm) && city !== searchTerm
              );
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
      )} */}
    </div>
  );
};

export default SearchSection;

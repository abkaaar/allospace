import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import data from "../data.json";


const SearchSection = () => {
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
    e.preventDefault(); // Prevent the default form submission
    onSearch(value);
  };
  return (
    <div className="search-box flex flex-col justify-center w-fit">
      <form
        className="bg-[#FFB700] p-1 gap-1 rounded-md flex"
        onSubmit={handleFormSubmit}
      >
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder="Type in a city or area"
            className="p-3 rounded-md min-w-[245px] sm:w-[450px] shrink bg-white"
            value={value}
            onChange={handleOnChange}
          />
        </div>
        <button
          className="text-white px-3 rounded-md bg-[#00593F] w-full"
          type="submit"
        >
          Search
        </button>
      </form>

      {isDropdownVisible && (
        <div className="bg-white p-3 z-50 w-fit shadow-md rounded-md">
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
 {/* <Select
            value={value}
            //   onChange={(selectedValue) => onSearch(selectedValue)}
          >
            <SelectContent>
              {data
                .filter((item) => {
                  const searchTerm = value.toLowerCase();
                  const city = item.city.toLowerCase();

                  return (
                    searchTerm &&
                    city.startsWith(searchTerm) &&
                    city !== searchTerm
                  );
                })
                .slice(0, 10)
                .map((item) => (
                  <SelectItem key={item.city} value={item.city}>
                    {item.city}, {item.state} state
                  </SelectItem>
                ))}
            </SelectContent>
          </Select> */}
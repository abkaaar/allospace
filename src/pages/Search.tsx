import * as React from "react";

import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipLoader } from "react-spinners";
import FilterSection from "@/components/FilterSection";
import GoogleMapSection from "@/components/GoogleMapSection";
import SpaceCard from "@/components/SpaceCard";
import { MapIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {Dialog , DialogPanel } from "@headlessui/react";

const BACKEND_URL = import.meta.env.VITE_APP_URL;

interface Space {
  _id: string;
  name: string;
  description: string;
  address: string;
  availability: string;
  price: number;
  images?: [{ url: string }];
  createdAt: string;
}

const SearchPage = () => {
  const [MapOpen, setMapOpen] = useState(false);

  const [spaces, setSpaces] = useState<Space[]>([]); // State to store fetched spaces
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(false); // State to handle loading status
  // const [error, setError] = useState("");

  const locate = useLocation();
  const queryParams = new URLSearchParams(locate.search);
  const location = useLocation();
  const [value, setValue] = useState("");
  const [spaceType,
    //  setSpaceType
    ] = useState(""); // For space type filter
  const [occupancy, 
    // setOccupancy
  ] = useState(""); // For occupancy filter
  const initialAddress = queryParams.get("city") || "";
  const [searchValue, setSearchValue] = useState(initialAddress);
  
  
  useEffect(() => {
    const fetchSpaces = async () => {
      setLoading(true);
      // setError("");
      try {
        const response = await axios.get(
          `${BACKEND_URL}/search`,
          {
            params: { address: searchValue }, // Send form data as query params
          }
        );

        if (response.data.success) {
          setSpaces(response.data.data); // Update state with the fetched spaces
          setFilteredSpaces(response.data.data); // Initially show all results
        } else {
          console.error("No spaces found");
          setSpaces([]); // Clear the spaces state if no spaces are found
          setFilteredSpaces([]);
        }
      } catch (error) {
        console.error("Error fetching spaces:", error);
        setSpaces([]);
        setFilteredSpaces([]);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchSpaces(); // Fetch spaces whenever the city changes
    }
    if (searchValue) fetchSpaces();
  }, [location, searchValue]);

  // Apply filters whenever spaceType or occupancy changes
  useEffect(() => {
    const filtered = spaces.filter((space) => {
      const matchesType = spaceType ? space.name === spaceType : true;
      const matchesOccupancy = occupancy
        ? space.availability === occupancy
        : true;
      return matchesType && matchesOccupancy;
    });
    setFilteredSpaces(filtered);
  }, [spaces, spaceType, occupancy]);


  // search & filter
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSearch = (searchTerm: string) => {
    setValue(searchTerm);
    
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    onSearch(value);
  };

  return (
    <>
      <Nav />
      <div id="search&filter" className="p-4">
        <div className="search-box flex gap-4 flex-wrap items-center justify-center w-fit">
          <form
            className="bg-[#FFB700] p-1 gap-1 rounded-md  hidden"
            onSubmit={handleFormSubmit}
          >
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Type by city or country"
                className="p-3 rounded-md min-w-[245px] sm:w-[450px] shrink"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
            <button
              className="text-white px-3 rounded-md bg-[#00593F] w-full"
              type="submit"
            >
              Search
            </button>
          </form>
    
          <div className="flex gap-2">
           
            <FilterSection/>
            <Button 
            //  onClick={() => setMapOpen(true)}
            className="bg-[#00593F]">
              Map
              <MapIcon className="ml-2"/>
            </Button>

          </div>
        </div>
      </div>
      <Dialog
        open={MapOpen}
        onClose={setMapOpen}
        className=""
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-32 md:inset-y-36 lg:inset-y-20 right-0 z-50 w-full h-full overflow-y-auto bg-white px-6 py-6 sm:max-w-6xl  sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMapOpen(false)}
              className="flex items-center -m-2.5 rounded-md p-2.5 text-gray-700"
            >  <X aria-hidden="true" className="h-4 w-4" /> Close map
              <span className="sr-only">Close menu</span>
            
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
          <GoogleMapSection/>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

    <div className="flex ">      
      <div className="mb-10 w-full">
        {loading ? (
          <div className="h-[100vh] flex items-center justify-center">
            <ClipLoader /> 
          </div>
        ) : filteredSpaces.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:gap-3 p-12">
            {spaces.map((space) => (
              <SpaceCard key={space._id} space={space}/>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:gap-8  p-12">
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        )}
      </div>
        
      </div>
   
   
    </>
  );
};
export default SearchPage;

{
  /* <div className="">
                <select
                  name="spaceType"
                  id="spaceType"
                  className="p-3 rounded-md sm:w-[250px]"
                  value={spaceType}
                  onChange={(e) => setSpaceType(e.target.value)} // Upda
                >
                  <option value="">Select space type</option>
                  <option>Office</option>
                  <option>Meeting rooms</option>
                  <option>Coworking desk</option>
                  <option>Conference Room</option>
                </select>
              </div>

              <div className="">
                <select
                  name="occupancy"
                  id="occupancy"
                  className="p-3 rounded-md sm:w-[250px]"
                  value={occupancy}
                  onChange={(e) => setOccupancy(e.target.value)} // Update state with user i
                >
                  <option value="">Select occupancy</option>
                  <option>Fulltime - monthly</option>
                  <option>Book hourly or daily</option>
                </select>
              </div>
 */
}

import * as React from "react";

import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { ClipLoader } from "react-spinners";
import FilterSection from "@/components/FilterSection";
import GoogleMapSection from "@/components/GoogleMapSection";
import SpaceCard from "@/components/SpaceCard";
import { 
  // MapIcon, 
  X } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { Dialog, DialogPanel } from "@headlessui/react";
import Footer from "@/components/Footer";

const BACKEND_URL = import.meta.env.VITE_APP_URL;

interface Space {
  _id: string;
  name: string;
  description: string;
  address: string;
  availability: string;
  price: number;
  term: string;
  images?: [{ url: string }];
  createdAt: string;
}

const SearchPage: React.FC = () => {
  const [MapOpen, setMapOpen] = useState(false);

  const [spaces, setSpaces] = useState<Space[]>([]); // State to store fetched spaces
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(false); // State to handle loading status

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialAddress = queryParams.get("city") || "";

  const [spaceType, setSpaceType] = useState("");
  const [occupancy, setOccupancy] = useState("");

  useEffect(() => {
    const fetchSpaces = async () => {
      if (!initialAddress) return;
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/search`, {
          params: {
            address: initialAddress,
          },
        });

        if (response.data.success) {
          const fetchedSpaces = response.data.data || [];
          setSpaces(fetchedSpaces);
         
        } else {
          console.error("No spaces found");
          setSpaces([]); // Clear the spaces state if no spaces are found
        }
      } catch (error) {
        console.error("Error fetching spaces:", error);
        setSpaces([]);
        
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, [initialAddress]);

  // Apply filters whenever spaceType, occupancy, or spaces changes

  useEffect(() => {
    const filtered = spaces.filter((space) => {
      const matchesType = !spaceType || space.name.toLowerCase().includes(spaceType.toLowerCase());
      const matchesOccupancy = !occupancy || space.term.toLowerCase() === occupancy.toLowerCase();
      return matchesType && matchesOccupancy;
    });
    setFilteredSpaces(filtered);
  }, [spaces, spaceType, occupancy]);

  const handleClearFilters = () => {
    setSpaceType("");
    setOccupancy("");
    setFilteredSpaces(spaces); // Reset to the original spaces
  };


  return (
    <>
      <Nav />
      <div id="filter" className="p-4">
        <div className="flex gap-4 flex-wrap items-center justify-center w-fit">
          <div className="flex gap-2">
            <FilterSection
              onSpaceTypeChange={setSpaceType}
              onOccupancyChange={setOccupancy}
              onClearFilter={handleClearFilters}
            />

            {/* <Button onClick={() => 
              setMapOpen(true)} 
              className="bg-[#00593F]">
              Map
              <MapIcon className="ml-2" />
            </Button> */}
          </div>
        </div>
      </div>
      <Dialog open={MapOpen} onClose={setMapOpen} className="">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-32 md:inset-y-36 lg:inset-y-20 right-0 z-50 w-full h-full overflow-y-auto bg-white px-6 py-6 sm:max-w-6xl  sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMapOpen(false)}
              className="flex items-center -m-2.5 rounded-md p-2.5 text-gray-700"
            >
              {" "}
              <X aria-hidden="true" className="h-4 w-4" /> Close map
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <GoogleMapSection />
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
              {filteredSpaces.map((space) => (
                <SpaceCard key={space._id} space={space} />
              ))}
            </div>
          ) : (
            <div className="p-12">
            <div className="flex h-full w-full items-center justify-center">
              <h1 className="font-semibold ">Space not available</h1>
            </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};
export default SearchPage;

import * as React from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";

import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipLoader } from "react-spinners";
import FilterSection from "@/components/FilterSection";
import GoogleMapSection from "@/components/GoogleMapSection";
import {  MapPin } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_APP_URL;

interface Space {
  _id: string;
  name: string;
  description: string;
  address: string;
  availability: string;
  price?: number;
  images?: [{ url: string }];
  createdAt: string;
}

const SearchPage = () => {


  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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
    
          <div>
           
            <FilterSection/>

          </div>
        </div>
      </div>

    <div className="flex ">
      
      <div className="mb-10 w-full">
        {loading ? (
          <div className="h-[100vh] flex items-center justify-center">
            <ClipLoader /> 
          </div>
        ) : filteredSpaces.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:gap-8 lg:grid-cols-2 p-12">
            {spaces.map((space) => (
              <Link to={`/space/${space._id}`} key={space._id}>
                <Card x-chunk="dashboard-01-chunk-0">
                  {space.images && space.images.length === 1 ? (
                    <img
                      src={space.images[0]?.url} // Safe access to the first image URL
                      alt="Office"
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "cover",
                        backgroundSize: "cover",
                      }}
                    />
                  ) : space.images && space.images?.length > 1 ? (
                    // Render a Swiper carousel if there are multiple images
                    <Carousel className="w-full" setApi={setApi}>
                      <CarouselContent>
                        {space.images?.map((image, index) => (
                          <CarouselItem key={index}>
                            <img
                              src={image.url}
                              alt={`Office image ${index + 1}`}
                              style={{
                                height: "200px",
                                width: "100%",
                                borderRadius: "10px",
                                objectFit: "cover",
                                backgroundSize: "cover",
                              }}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="py-1 text-center text-[10px] text-muted-foreground">
                        Slide {current} of {count}
                      </div>
                    </Carousel>
                  ) : (
                    // Optional fallback if no images are available
                    <img
                      src="/placeholder.svg" // Safe access to the first image URL
                      alt="Office"
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "cover",
                        backgroundSize: "cover",
                      }}
                    />
                  )}

                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {space.name}
                      <p className="text-[10px]">
                        </p>
                          <div className="flex items-center gap-2">
                          <MapPin width={12} height={12} /> 
                          <span className="text-[12px] font-thin">
                        {space.address}
                        </span>
                          </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-md font-medium">₦{space.price}/day</div>
                    <Badge variant="available">{space.availability}</Badge>
                  </CardContent>
                </Card>
              </Link>
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
         <div className="justify-center w-full hidden lg:flex sticky"> 
          <GoogleMapSection/>
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

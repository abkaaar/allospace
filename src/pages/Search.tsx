import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Nav from "../components/Nav";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Space {
  _id: string;
  name: string;
  description: string;
  location: string;
  availability: string;
  price?: number;
  image?: { url: string };
  createdAt: string;
}

const SearchPage = () => {
  const [spaces, setSpaces] = useState<Space[]>([]); // State to store fetched spaces
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [error, setError] = useState("");

  const locate = useLocation();
  const queryParams = new URLSearchParams(locate.search);
  const location = queryParams.get("city");

  
  useEffect(() => {
    const fetchSpaces = async () => {
    setLoading(true);
    setError(""); 
    try {
      const response = await axios.get("http://localhost:3000/spaces/search", {
        params: { location }, // Send form data as query params
      });

      if (response.data.success) {
        setSpaces(response.data.data); // Update state with the fetched spaces
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
    
    if (location) {
      fetchSpaces(); // Fetch spaces whenever the city changes
    }
  }, [location]);


  if (error) {
    return <div>{error}</div>; // Show error message if there was an issue
  }

  return (
    <>
      <Nav />
      <div>
        {loading ? (
          <p>Loading...</p> // Display a loading message while fetching data
        ) : 
            spaces.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 p-12">
            {spaces.map((space) => (
                <Link to={`/space/${space._id}`} key={space._id}>
                <Card x-chunk="dashboard-01-chunk-0">
                  <img
                    src={space.image?.url}
                    alt="office"
                    style={{
                      height: "200px",
                      width: "100%",
                      objectFit: "cover",
                      backgroundSize: "cover",
                    }}
                  />
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {space.name}
                    </CardTitle>
                    <Badge variant="destructive">{space.availability}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-md font-bold">${space.price}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
            ) : (
                <div className="">
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
                  </div><div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div><div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </div>
            )}
       
        
      </div>
      <Footer />
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

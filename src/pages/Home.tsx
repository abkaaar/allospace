import Footer from "@/components/Footer";
import Nav from "../components/Nav";
import { Armchair, Building, Theater } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

interface Space {
  _id: string;
  name: string;
  description: string;
  location: string;
  availability: string;
  price?: number; // Optional field if price might not be present
  image?: { url: string }; // Optional image field
  createdAt: string; // Date of creation as string
}

const Home = () => {
  const [location, setLocation] = useState(""); // State for location input
  const [spaceType, setSpaceType] = useState(""); // State for space type
  const [occupancy, setOccupancy] = useState(""); // State for occupancy
  const [spaces, setSpaces] = useState<Space[]>([]); // State to store fetched spaces
  const [loading, setLoading] = useState(false); // State to handle loading status

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    // Set loading to true before making the request
    setLoading(true);

    try {
      // Call the API to fetch spaces based on location, space type, and occupancy
      const response = await axios.get(
        "http://localhost:3000/spaces/search",
        {
          params: { location, spaceType, occupancy }, // Send form data as query params
        }
      );

      if (response.data.success) {
        setSpaces(response.data.data); // Update state with the fetched spaces
      } else {
        console.error("No spaces found");
        setSpaces([]); // Clear the spaces state if no spaces are found
      }
    } catch (error) {
      console.error("Error fetching spaces:", error);
      setSpaces([]); // Clear spaces state on error
    } finally {
      setLoading(false); // Set loading to false after request is completed
    }
  };

  return (
    <>
      <Nav />
      <main>
        <div className="category bg-[#00593F] w-full sm:px-20 sm:py-10 flex gap-1">
          <Link to="/offices">
            <button className="px-6 py-3 rounded-full border bg-[#00593F] hover:bg-[#1e6e56] text-white flex gap-2">
              <Armchair />
              Offices
            </button>
          </Link>
          <button className="px-6 py-3 rounded-full bg-[#00593F] hover:bg-[#1e6e56] text-white flex gap-2">
            <Building />
            Co-working space
          </button>
          {/* <button className="px-6 py-3 rounded-full bg-[#00593F] hover:bg-[#1e6e56] text-white flex gap-2">
            <Building />
            Event space
          </button> */}
          <button className="px-6 py-3 rounded-full bg-[#00593F] hover:bg-[#1e6e56] text-white flex gap-2">
            <Theater />
            Meeting rooms
          </button>
        </div>
        <div className="banner bg-[#00593F] max-h-96 w-full sm:px-20 sm:py-10">
          <article className="text-white flex flex-col  gap-4">
            <h1 className="font-medium text-6xl">Find your next work space</h1>
            <p className="font-normal text-2xl ">
              Search low prices on offices, meeting rooms, co-working space and
              much more...
            </p>
          </article>
          <div className="search-box flex flex-col justify-center relative top-20">
            <form
              onSubmit={handleFormSubmit}
              className="bg-[#FFB700] p-1 gap-1 rounded-md md:flex"
            >
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Type in a city or area"
                  className="p-3 rounded-md sm:w-[350px]"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)} // Upda
                />
              </div>
              <div className="">
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

              <button className="text-white px-3 rounded-md bg-[#00593F]">
                Search
              </button>
            </form>
            {loading ? (
              <p>Loading...</p> // Display a loading message while fetching data
            ) : (
              <div>
                {spaces.length > 0 ? (
                  <ul>
                    {spaces.map((space) => (
                      <li key={space._id}>
                        {space.name} - {space.location}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No spaces found</p> // Display message if no spaces are found
                )}
              </div>
            )}
          </div>
        </div>
        <div className="space-type mt-24 mb-24 lg:flex sm:px-20 gap-8">
          <div className="type">
            <h2 className="font-bold">Book on-demand</h2>
            <div className="sm:flex gap-6">
              <Card className="meeting py-6 px-4 w-96 border rounded-md mt-4">
                <article>
                  <h2 className="font-medium">Meeting rooms</h2>
                  <p>To meet and present</p>
                </article>
              </Card>
              <div className="meeting py-6 px-4 w-96 border rounded-md mt-4">
                <article>
                  <h2 className="font-medium">Co-working spaces</h2>
                  <p>Shared workspace</p>
                </article>
              </div>
            </div>
            <div className="sm:flex gap-6">
              <div className="meeting py-6 px-4 w-96 border rounded-md mt-4">
                <article>
                  <h2 className="font-medium">Event space</h2>
                  <p>For conferences and get-togethers</p>
                </article>
              </div>
              <Card className="meeting py-6 px-4 w-96 border rounded-md mt-4">
                <article>
                  <h2 className="font-medium">Private day offices</h2>
                  <p>A room with desk and chairs</p>
                </article>
              </Card>
            </div>
          </div>
          <span className="border"></span>
          <div className="term">
            <h2 className="font-bold">Rent longer-term</h2>
            <Card className="meeting py-6 px-4 w-72 border rounded-md mt-4">
              <article>
                <h2 className="font-medium">Full-time offices</h2>
                <p>Entire office to rent</p>
              </article>
            </Card>
            <Card className="meeting py-6 px-4 w-72 border rounded-md mt-4">
              <article>
                <h2 className="font-medium">Part-time offices</h2>
                <p>Your own office 1-3 days every week</p>
              </article>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;

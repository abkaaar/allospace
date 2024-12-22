import Footer from "@/components/Footer";
import Nav from "../components/Nav";
import "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

import { Skeleton } from "@/components/ui/skeleton";

import SpaceCard from "@/components/SpaceCard";

const BACKEND_URL = import.meta.env.VITE_APP_URL;
interface Space {
  type: string;
  _id: string;
  name: string;
  address: string;
  description: string;
  availability: string;
  price: number; // Optional field if price might not be present
  images?: [{ url: string }]; // Optional image field
  createdAt: string; // Date of creation as string
}

const EventSpaces = () => {
  const [isLoading, setIsLoading] = useState(false); // Track transition state
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>([]); // Use state to store filtered spaces
  const type = "Event space";

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`${BACKEND_URL}/spaces`);
        if (data.success) {
          const filtered = data.data.filter(
            (space: Space) => space.type === type
          );
          setFilteredSpaces(filtered); // Update the filtered spaces state
          console.log(filtered);
          setIsLoading(false);
        } else {
          console.error("Error:", data.message);
        }
      } catch (error) {
        console.error("API call error:", error);
      }
    };

    fetchSpaces();
  }, [type]);

  return (
    <>
      <Nav type="search" />
      <main>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 p-12">
          {isLoading ? (
            <>
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
            </>
          ) : (
            <>
              {filteredSpaces.length > 0 ? (
                filteredSpaces.map((space) => (
                  <SpaceCard key={space._id} space={space} />
                ))
              ) : (
                <p>No spaces found for the selected type.</p>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EventSpaces;

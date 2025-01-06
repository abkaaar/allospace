import "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

import SpaceCard from "@/components/SpaceCard";
const BACKEND_URL = import.meta.env.VITE_APP_URL;

interface Space {
  _id: string;
  name: string;
  description: string;
  address: string;
  term: string;
  availability: string;
  price: number; // Optional field if price might not be present
  images?: [{ url: string }]; // Optional image field
  createdAt: string; // Date of creation as string
}

const AllWorkspaces = () => {

  const [spaces, setSpaces] = useState<Space[]>([]); // Use state to store the spaces
  const [isLoading, setIsLoading] = useState(false); // Track transition state

  // Fetch the spaces on component mount
  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`${BACKEND_URL}/spaces`, {});

      console.log(data)
      if (data.success) {
        setSpaces(data.data); // Update the spaces state with the fetched data
        setIsLoading(false);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  // Helper to render skeletons
  const renderSkeletons = (count = 4) => {
    return Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ));
  };


  return (
    <>
      
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 p-2">
          {isLoading ? (
            renderSkeletons()
          ) : spaces.length > 0 ? (
            spaces.map((space) => <SpaceCard key={space._id} space={space} />)
          ) : (
            <p>No spaces available</p>
          )}
        </div>
     
    </>
  );
};

export default AllWorkspaces;
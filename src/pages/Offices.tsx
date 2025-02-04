// import * as React from "react";
import Footer from "@/components/Footer";
import Nav from "../components/Nav";
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
      <Nav />
      <main>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 p-12">
          {isLoading ? (
            renderSkeletons()
          ) : spaces.length > 0 ? (
            spaces.map((space) => <SpaceCard key={space._id} space={space} />)
          ) : (
            <p>No spaces available</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};



export default AllWorkspaces;
//             <Link to={`/space/${space._id}`} key={space._id}>
//               <Card x-chunk="dashboard-01-chunk-0">
//                 {space.images && space.images.length === 1 ? (
//                   <img
//                     src={space.images[0]?.url} // Safe access to the first image URL
//                     alt="Office"
//                     style={{
//                       height: "200px",
//                       width: "100%",
//                       objectFit: "cover",
//                       backgroundSize: "cover",
//                     }}
//                   />
//                 ) : space.images && space.images?.length > 1 ? (
//                   // Render a Swiper carousel if there are multiple images
//                       <Carousel className="w-full" setApi={setApi}>
//                       <CarouselContent>
//                         {space.images?.map((image, index) => (
//                           <CarouselItem key={index}>
//                             <img
//                               src={image.url}
//                               alt={`Office image ${index + 1}`}
//                               style={{
//                                 height: "200px",
//                                 width: "100%",
//                                 borderRadius:"10px",
//                                 objectFit: "cover",
//                                 backgroundSize: "cover",
//                               }}
//                             />
//                           </CarouselItem>
//                         ))}
//                       </CarouselContent>
//                       <div className="py-1 text-center text-[10px] text-muted-foreground">
//                       Slide {current} of {count}
//                     </div>
//                   </Carousel>
//                 ) : (
//                   // Optional fallback if no images are available
//                   <img
//                     src="/placeholder.svg" // Safe access to the first image URL
//                     alt="Office"
//                     style={{
//                       height: "200px",
//                       width: "100%",
//                       objectFit: "cover",
//                       backgroundSize: "cover",
//                     }}
//                   />
//                 )}

// <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium">
//                       {space.name}
//                       <p className="text-[10px]">
//                         </p>
//                           <div className="flex items-center gap-2">
//                           <MapPin width={12} height={12} /> 
//                           <span className="text-[12px] font-thin">
//                         {space.address}
//                         </span>
//                           </div>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-sm font-medium text-[#00593f]"> {space.price}/day</div>
//                     <Badge variant="available">{space.availability}</Badge>
//                   </CardContent>
//               </Card>
//             </Link>
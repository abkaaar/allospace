// import * as React from "react";

import Footer from "@/components/Footer";
import Nav from "../components/Nav";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
// import { Badge } from "@/components/ui/badge";
// import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import // Carousel,
// CarouselApi,
// CarouselContent,
// CarouselItem,
"@/components/ui/carousel";
// import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
// import { formatCurrency } from "@/lib/formatCurrency";
import SpaceCard from "@/components/SpaceCard";

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

const BACKEND_URL = import.meta.env.VITE_APP_URL;

const MeetingRooms = () => {
  // const [ setApi] = React.useState<CarouselApi>();

  const [isLoading, setIsLoading] = useState(false); // Track transition state
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>([]); // Use state to store filtered spaces
  const type = "Meeting room";

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
      <Nav type={"search"} />
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
                  // <Link to={`/space/${space._id}`} key={space._id}>
                  //   <Card x-chunk="dashboard-01-chunk-0">
                  //     {space.images && space.images.length === 1 ? (
                  //       <img
                  //         src={space.images[0]?.url} // Safe access to the first image URL
                  //         alt="Office"
                  //         style={{
                  //           height: "200px",
                  //           width: "100%",
                  //           objectFit: "cover",
                  //           backgroundSize: "cover",
                  //         }}
                  //       />
                  //     ) : space.images && space.images?.length > 1 ? (
                  //       // Render a Swiper carousel if there are multiple images
                  //       <Carousel className="w-full" setApi={setApi}>
                  //         <CarouselContent>
                  //           {space.images?.map((image, index) => (
                  //             <CarouselItem key={index}>
                  //               <img
                  //                 src={image.url}
                  //                 alt={`Office image ${index + 1}`}
                  //                 style={{
                  //                   height: "200px",
                  //                   width: "100%",
                  //                   borderRadius: "10px",
                  //                   objectFit: "cover",
                  //                   backgroundSize: "cover",
                  //                 }}
                  //               />
                  //             </CarouselItem>
                  //           ))}
                  //         </CarouselContent>
                  //         <div className="relative flex justify-between bottom-32 p-2">
                  //           <ChevronLeft className="bg-white rounded-full " />
                  //           <ChevronRight className="bg-white rounded-full " />
                  //         </div>
                  //       </Carousel>
                  //     ) : (
                  //       // Optional fallback if no images are available
                  //       <img
                  //         src="/placeholder.svg" // Safe access to the first image URL
                  //         alt="Office"
                  //         style={{
                  //           height: "200px",
                  //           width: "100%",
                  //           objectFit: "cover",
                  //           backgroundSize: "cover",
                  //         }}
                  //       />
                  //     )}

                  //     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  //       <CardTitle className="text-sm font-medium">
                  //         {space.name}
                  //         <p className="text-[10px]"></p>
                  //         <div className="flex items-center gap-2">
                  //           <MapPin width={12} height={12} />
                  //           <span className="text-[12px] font-thin">
                  //             {space.address}
                  //           </span>
                  //         </div>
                  //       </CardTitle>
                  //     </CardHeader>
                  //     <CardContent>
                  //       <div className="text-md font-medium">
                  //         {formatCurrency(space.price)}/day
                  //       </div>
                  //       <Badge variant="available">{space.availability}</Badge>
                  //     </CardContent>
                  //   </Card>
                  // </Link>
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

export default MeetingRooms;

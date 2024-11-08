// import * as React from "react";

// import  { useState } from "react";
// import { Link } from "react-router-dom";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { MapPin } from "lucide-react";
// import {Carousel, CarouselApi , CarouselContent, CarouselItem } from "@/components/ui/carousel";

// // Define the interface for the space prop
// interface Space {
//   _id: string;
//   name: string;
//   location: string;
//   price: number;
//   availability: string;
//   images: { url: string }[]; // Array of image objects, each with a 'url' string property
// }

// interface SpaceCardProps {
//   space: Space;
// }

// const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
//     const [api, setApi] = React.useState<CarouselApi>();
//     const [current, setCurrent] = React.useState(0);
//     const [count, setCount] = React.useState(0);
  
//     React.useEffect(() => {
//       if (!api) {
//         return;
//       }
  
//       setCount(api.scrollSnapList().length);
//       setCurrent(api.selectedScrollSnap() + 1);
  
//       api.on("select", () => {
//         setCurrent(api.selectedScrollSnap() + 1);
//       });
//     }, [api]);


//   return (
//     <Link to={`/space/${space._id}`} key={space._id}>
//       <Card>
//         {space.images && space.images.length === 1 ? (
//           <img
//             src={space.images[0]?.url}
//             alt="Office"
//             style={{
//               height: "200px",
//               width: "100%",
//               objectFit: "cover",
//               backgroundSize: "cover",
//             }}
//           />
//         ) : space.images && space.images.length > 1 ? (
//           <Carousel className="w-full">
//             <CarouselContent setApi={setApi}>
//               {space.images.map((image, index) => (
//                 <CarouselItem key={index}>
//                   <img
//                     src={image.url}
//                     alt={`Office image ${index + 1}`}
//                     style={{
//                       height: "200px",
//                       width: "100%",
//                       borderRadius: "10px",
//                       objectFit: "cover",
//                       backgroundSize: "cover",
//                     }}
//                   />
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <div className="py-1 text-center text-[10px] text-muted-foreground">
//               Slide {current} of {count}
//             </div>
//           </Carousel>
//         ) : (
//           <img
//             src="/placeholder.svg"
//             alt="Office"
//             style={{
//               height: "200px",
//               width: "100%",
//               objectFit: "cover",
//               backgroundSize: "cover",
//             }}
//           />
//         )}

//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">
//             {space.name}
//             <p className="text-[10px]"></p>
//             <div className="flex items-center gap-2">
//               <MapPin width={12} height={12} />
//               <span className="text-[12px] font-thin">{space.location}</span>
//             </div>
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <div className="text-md font-medium">₦{space.price}/day</div>
//           <Badge variant="available">{space.availability}</Badge>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// };

// export default SpaceCard;

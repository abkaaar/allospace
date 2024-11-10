import * as React from "react";

import Footer from "@/components/Footer";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
// import { ClipLoader } from "react-spinners";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuthContext } from "@/hooks/useAuthContext";
import { ClipLoader } from "react-spinners";
import {
  AirVentIcon,
  CircuitBoardIcon,
  MapPin,
  ProjectorIcon,
  SpeakerIcon,
  VideoIcon,
  WifiIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
const BACKEND_URL = import.meta.env.VITE_APP_URL || "http://localhost:3000";
interface Space {
  _id: string;
  name: string;
  description: string;
  availability: string;
  price?: number; // Optional field if price might not be present
  images?: [{ url: string }]; // Optional image field
  createdAt: string; // Date of creation as string
  amenities: string[];
  address: string;
}

const Office = () => {
  
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

  const [loading, setLoading] = useState(false); //state for loading
  const [space, setSpace] = useState<Space | null>(null); // Single space
  const { id } = useParams();

  const [checkInDate, setCheckInDate] = useState("");
  const [isLoading, setisLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const { user } = useAuthContext();

  // Mapping amenity names to icons (you can customize the icon component or source)
  const amenityIcons: { [key: string]: JSX.Element } = {
    wifi: <WifiIcon />, // Replace with your icon component
    projector: <ProjectorIcon />,
    air_conditioning: <AirVentIcon />,
    whiteboard: <CircuitBoardIcon />,
    sound_system: <SpeakerIcon />,
    video_conferencing: <VideoIcon />,
    // Add more icons as needed
  };

  useEffect(() => {
    const fetchSpace = async () => {
      setisLoading(true); // Start loading

      try {
        const response = await axios.get(`${BACKEND_URL}/space/${id}`);
        console.log(response)
        // setSpace(response.data);
        const amenitiesString = response.data.amenities[0] || ""; // Extract the string
        // Clean the string by removing unwanted characters: brackets, quotes, and extra spaces
        const cleanedAmenities = amenitiesString
          // eslint-disable-next-line no-useless-escape
          .replace(/[\[\]"']/g, "") // Remove brackets and quotes
          .split(",") // Split by commas to create an array
          .map((item: string) => item.trim()); // Trim whitespace from each item

        // Set the cleaned-up data to the state
        setSpace({
          ...response.data,
          amenities: cleanedAmenities, // Now amenities is an array of clean strings
        });
      } catch (error) {
        setisLoading(false); // Stop loading
        console.error(error);
      } finally {
        setisLoading(false); // Stop loading spinner
      }
    };

    if (id) {
      fetchSpace();
    }
  }, [id]);
  const isUserLoggedIn = user; // Check if the user is logged in

  const handleBookNowClick = () => {
    navigate("/login", { state: { from: window.location.pathname } }); // Save current path to redirect after login
  };

  // submit booking
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    setLoading(true); // Show loading spinner

    const bookingData = {
      user_id: user?.id, // Ensure user ID is available
      email: user?.email, // Ensure email is available
      name: user?.name, // Ensure name is available
      phoneNumber: user?.phoneNumber, // Ensure phone number is available
      startDate: checkInDate,
      space_id: space?._id, // Assuming you're using `space` to refer to the current space
      totalPrice: space?.price, // Assuming the price comes from the space
    };
    console.log("booking data:", bookingData);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/book`,
        bookingData
      );
      console.log("response", response);
      if (response.status === 201 && response.data.authorization_url) {
        // Redirect to Paystack's payment page using the URL from the response
        window.location.href = response.data.authorization_url;
      }
    } catch (error) {
      setLoading(false); // Show loading spinner
      console.error("Booking creation error:", error);
    }
  };
 
  // Display loading state
  if (isLoading) {
    return (
      <>
        <Nav />
        <main>
          <div className="flex justify-center items-center h-screen">
            <ClipLoader />
          </div>
        </main>
        <Footer />
      </>
    );
  }
  



  return (
    <>
      <Nav />
      <main>
        {space ? (
          <div className="lg:grid lg:min-h-[400px] lg:grid-cols-2 xl:min-h-[400px]">
            <div className="flex py-12">
              <div className="mx-6 flex flex-col gap-6 w-full">
                <div className="flex justify-between">
                <h1 className="text-3xl font-bold">{space?.name}</h1>
                <Badge className="" variant={"available"}>{space.availability}</Badge>
                </div>
               
                <h1 className="text-xl font-semibold bg-slate-100 p-2 w-fit rounded-md text-[#00593F]">
                  ₦{space?.price} / day
                </h1>

                <div className="flex items-center">
                  <MapPin className="text-[#00593F]" />
                  <p className="text-balance text-muted-foreground">
                    {space.address}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-lg">Description:</h6>
                  <p className="text-balance text-muted-foreground">
                    {space?.description}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-lg">Amenities:</h6>
                  <ul className="flex gap-2 flex-wrap">
                    {space.amenities.map((amenity, index) => (
                      <li
                        key={index}
                        className="amenity-item flex gap-2 bg-slate-100 w-fit p-4 rounded-md"
                      >
                        {amenityIcons[amenity] || (
                          <i className="icon-default" />
                        )}{" "}
                        {/* Display icon */}
                        <span>{amenity.replace("_", " ")}</span>{" "}
                        {/* Display amenity name */}
                      </li>
                    ))}
                  </ul>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"primary"}
                      className="shadow-2xl text-lg w-fit px-32 py-8"
                    >
                      Book Now
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px]">
                    <>
                      
                        <div className="flex justify-center w-full" >
                          {isUserLoggedIn ? (
                            <form onSubmit={handleSubmit} className="mt-4">
                              <div className="grid gap-4 py-4">
                                <h1 className="font-bold text-2xl">
                                  {space?.name}
                                </h1>
                              </div>

                              <div className="">
                                <div>
                                  <label
                                    htmlFor="check_in_date"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Check-In Date
                                  </label>
                                  <input
                                    type="date"
                                    id="check_in_date"
                                    value={checkInDate}
                                    onChange={(e) =>
                                      setCheckInDate(e.target.value)
                                    }
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                    required
                                  />
                                </div>
                              </div>

                              <DialogFooter>
                                <div className="flex-col gap-3 w-full ">
                                  <Button
                                    disabled={loading}
                                    type="submit"
                                    variant={"primary"}
                                    className="w-full mt-4 shadow-lg"
                                  >
                                    Book
                                  </Button>
                                </div>
                              </DialogFooter>
                            </form>
                          ) : (
                            <Button variant={"primary"}
                              onClick={handleBookNowClick} // Attach click handler
                            >
                              Sign in to continue.
                            </Button>
                          )}
                        </div>
                      
                    </>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex items-center justify-center p-8">
              {space && (
                <>
                  {space.images && space.images.length === 1 ? (
                    // Render a single image if there's only one
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
                    // Render a carousel if there are multiple images
                    <Carousel className="w-full max-w-xs" setApi={setApi}>
                      <CarouselContent>
                        {space.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <img
                              src={image.url}
                              alt={`Office image ${index + 1}`}
                              style={{
                                height: "400px",
                                borderRadius: "15px",
                                width: "100%",
                                objectFit: "cover",
                                backgroundSize: "cover",
                              }}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {/* <CarouselPrevious />
       <CarouselNext /> */}
                      <div className="py-2 text-center text-sm text-muted-foreground">
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
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            <p>Loading space information...</p>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Office;
{
  /* <div>
                                     <label
                                       htmlFor="check_in_time"
                                       className="block text-sm font-medium text-gray-700"
                                     >
                                       Check-In Time
                                     </label>
                                     <input
                                       type="time"
                                       id="check_in_time"
                                       value={checkInTime}
                                       onChange={(e) =>
                                         setCheckInTime(e.target.value)
                                       }
                                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                       required
                                     />
                                   </div> */
}
{
  /* <div>
                                     <label
                                       htmlFor="check_out_date"
                                       className="block text-sm font-medium text-gray-700"
                                     >
                                       Check-Out Date
                                     </label>
                                     <input
                                       type="date"
                                       id="check_out_date"
                                       value={checkOutDate}
                                       onChange={(e) =>
                                         setCheckOutDate(e.target.value)
                                       }
                                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                       required
                                     />
                                   </div> */
}
{
  /* <div>
                                     <label
                                       htmlFor="check_out_time"
                                       className="block text-sm font-medium text-gray-700"
                                     >
                                       Check-Out Time
                                     </label>
                                     <input
                                       type="time"
                                       id="check_out_time"
                                       value={checkOutTime}
                                       onChange={(e) =>
                                         setCheckOutTime(e.target.value)
                                       }
                                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                       required
                                     />
                                   </div> */
}

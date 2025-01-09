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
import ReviewForm from "@/components/ReviewForm";
import ReviewComponent from "@/components/Review";
import { formatCurrency } from "@/lib/formatCurrency";
const BACKEND_URL = import.meta.env.VITE_APP_URL;


interface SpaceProps {
  space?: {
    _id: string;
    name: string;
    description: string;
    availability: string;
    price: number; // Optional field if price might not be present
    images?: [{ url: string }]; // Optional image field
    createdAt: string; // Date of creation as string
    amenities: string[];
    address: string;
    manager: string;
  }
}

const Office = (props: SpaceProps) => {

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  // const [count, setCount] = React.useState(0);


  const [loading, setLoading] = useState(false);
  const [space, setSpace] = useState<SpaceProps["space"] | null>(props.space);
  const { id } = useParams();

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(0);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  },
    [api, space?.images?.length]);

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

  // submit review
  // const ReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // Prevent default form submission behavior

  //   const reviewData = {
  //     reviewer: user?.id,  
  //     name: user?.name,  
  //     ReviewDate: date,
  //     manager: reviewedUser,  
  //     review: review,
  //     rating: user.rating,
  //   };
  //   console.log("review data:", reviewData);
  //   try {
  //     const response = await axios.post(
  //       `${BACKEND_URL}/review`,
  //       reviewData
  //     );
  //     console.log("response", response);
  //   } catch (error) {
  //     setLoading(false); // Show loading spinner
  //     console.error("Booking creation error:", error);
  //   }
  // };



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


            <div className="flex justify-center p-8">
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
                    <div className="flex flex-col gap-6">
                      <Carousel className="w-full h-fit max-w-lg" setApi={setApi}>
                        <CarouselContent>
                          {space.images.map((image, index) => (
                            <CarouselItem key={index} className="w-full">
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
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                          {space.images?.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                api?.scrollTo(index);
                              }}
                              className={`h-2 w-2 rounded-full transition-colors ${current === index ? 'bg-white h-2.5 w-2.5' : 'bg-white/70'
                                }`}
                              aria-label={`Go to slide ${index + 1}`}
                            />
                          ))}
                        </div>
                      </Carousel>
                      <div className="p-2 hidden md:flex md:flex-col md:gap-2">
                        <h6 className="font-semibold text-lg">Amenities:</h6>
                        <ul className="flex gap-2 flex-wrap w-80 lg:w-auto">
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
                      <div className="hidden md:flex md:flex-col">
                        <ReviewComponent />
                        <ReviewForm />
                      </div>
                    </div>
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
            <div className="flex flex-col py-12">
              <div className="mx-6 flex flex-col gap-6 w-auto">
                <div className="flex gap-4 flex-col justify-between">
                  <h1 className="lg:text-3xl text-xl font-bold">{space?.name}</h1>
                </div>

                <h1 className="text-xl font-semibold w-fit rounded-md text-[#00593F]">
                  {formatCurrency(space.price)} <span className="text-black text-sm">per day</span>
                </h1>

                <div className="flex items-center">
                  <MapPin className="text-[#00593F]" />
                  <p className="text-balance text-muted-foreground">
                    {space.address}
                  </p>
                </div>
                <div className="p-2">
                  <h6 className="font-semibold text-lg">Description:</h6>
                  <p className="w-80 lg:w-full text-balance text-muted-foreground">
                    {space?.description}
                  </p>
                </div>
                <div className="p-2 md:hidden flex flex-col gap-2">
                  <h6 className="font-semibold text-lg">Amenities:</h6>
                  <ul className="flex gap-2 flex-wrap w-80 lg:w-auto">
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
                <div className="flex md:hidden flex-col">
                        <ReviewComponent />
                        <ReviewForm />
                      </div>
              <div className="flex justify-center md:justify-start mt-4 sm:mt-0 sm:relative sm:w-auto fixed mb-4 bottom-6 inset-x-10 sm:bottom-auto sm:inset-x-auto ">
              <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"primary"}
                      className="shadow-2xl text-lg w-fit px-24 py-6 "
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

            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center h-[80vh]">
              <p>Loading space information, please wait...</p>
            </div>
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

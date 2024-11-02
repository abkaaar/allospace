import * as React from "react";

import Footer from "@/components/Footer";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ClipLoader } from "react-spinners";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuthContext } from "@/hooks/useAuthContext";

interface Space {
  _id: string;
  name: string;
  description: string;
  availability: string;
  price?: number; // Optional field if price might not be present
  images?: [{ url: string }]; // Optional image field
  createdAt: string; // Date of creation as string
  amenities: [];
  location: string;
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
  // const [errorMessage, setErrorMessage] = useState("");h
  const [isBooked, setIsBooked] = useState(false); // Add state to track if booked
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSpace = async () => {
      setisLoading(true); // Start loading

      try {
        const response = await axios.get(`http://localhost:3000/space/${id}`);
        setSpace(response.data);

        // Check if space is already booked and paid
        if (response.data.isPaid) {
          setIsBooked(true);
        } else {
          setIsBooked(false);
        }
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

  const handleBookNowClick = () => {
    const isUserLoggedIn = user; // Check if the user is logged in

    if (!isUserLoggedIn) {
      // Redirect to login page
      navigate("/login", { state: { from: window.location.pathname } }); // Save current path to redirect after login
    } else {
      // Proceed with booking logic
      // Trigger the booking dialog or function here
      console.log("User is logged in. Proceed with booking.");
      // You can call a function here to open a booking dialog or initiate booking
    }
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
        "http://localhost:3000/book",
        bookingData
      );
      console.log("response",response)
      // Check if booking was created successfully
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
  if (loading) {
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
        <div className="lg:grid lg:min-h-[400px] lg:grid-cols-2 xl:min-h-[400px]">
          <div className="flex py-12">
            <div className="mx-6 flex flex-col gap-6 w-full">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{space?.name}</h1>
                <h1 className="text-xl font-semibold">₦{space?.price}</h1>
              </div>
              <div>
                <h6 className="font-semibold">Location:</h6>
                <p className="text-balance text-muted-foreground">
                  {space?.location}
                </p>
              </div>
              <div>
                <h6 className="font-semibold">Description:</h6>
                <p className="text-balance text-muted-foreground">
                  {space?.description}
                </p>
              </div>
              <div>
                <h6 className="font-semibold">Amenities:</h6>
                <p>{space?.amenities}</p>
              </div>
              <Dialog onOpenChange={(open) => !open && setIsBooked(false)}>
                {isBooked ? (
                  <p className="text-red-500 mt-4">this is booked</p>
                ) : (
                  <DialogTrigger asChild>
                    <Button
                      variant={"primary"}
                      className="shadow-2xl text-lg w-fit px-32 py-8"
                      onClick={handleBookNowClick} // Attach click handler
                    >
                      Book Now
                    </Button>
                  </DialogTrigger>
                )}
                <DialogContent className="sm:max-w-[425px]">
                  <>
                    <Tabs defaultValue="booking">
                      <TabsContent value="booking">
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
                                onChange={(e) => setCheckInDate(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                              />
                            </div>
                            {/* <div>
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
                                  </div> */}
                            {/* <div>
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
                                  </div> */}
                            {/* <div>
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
                                  </div> */}
                          </div>

                          <DialogFooter>
                            <Button
                              disabled={isLoading}
                              type="submit"
                              variant={"primary"}
                              className="w-full mt-4 shadow-lg"
                            >
                              Book
                            </Button>
                          </DialogFooter>
                        </form>
                      </TabsContent>
                    </Tabs>
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
      </main>
      <Footer />
    </>
  );
};

export default Office;

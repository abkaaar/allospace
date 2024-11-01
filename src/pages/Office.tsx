import * as React from "react";

import Footer from "@/components/Footer";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
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

  const { user } = useAuthContext();


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

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  // const [checkInTime, setCheckInTime] = useState("");
  // const [checkOutDate, setCheckOutDate] = useState("");
  // const [checkOutTime, setCheckOutTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBooked, setIsBooked] = useState(false); // Add state to track if booked

  // Fetch the space on component mount
  useEffect(() => {
    setLoading(true); // start loading
    const fetchSpace = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/space/${id}`);
        setSpace(response.data);
      } catch (error) {
        console.error("API call error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSpace();
    }
  }, [id]);

  // submit booking
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    setIsLoading(true); // Show loading spinner
    setErrorMessage(""); // Clear previous error message

    const bookingData = {
      user_id: user?.id,
      email: user?.email,
      startDate: checkInDate,
      space_id: space?._id, // Assuming you're using `space` to refer to the current space
      totalPrice: space?.price, // Assuming the price comes from the space
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/book",
        bookingData
      );
      // Check if response is successful
      if (
        response.status === 201 &&
        response.data.message === "Booking created successfully"
      ) {
        setIsBooked(true); // Show success message
      }
    } catch (error) {
      // Assert error as AxiosError
  const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 400) {
        setErrorMessage("this space is already booked. Please try another day.");
        setIsBooked(false); // Show success message
      } else {
        setErrorMessage("Booking failed. Please try again."); // Show error message
      }
    } finally {
      setIsLoading(false); // Stop loading spinner
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
                    {isBooked ? (
                      // Display large success message and hide the form when booking is successful
                      <div className="flex justify-center items-center min-h-[300px]">
                        <h1 className="text-3xl font-bold text-green-600">
                          Booking Successful!
                        </h1>
                      </div>
                    ) : (
                      <>
                        {isLoading ? (
                          <ClipLoader />
                        ) : (
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
                                      onChange={(e) =>
                                        setCheckInDate(e.target.value)
                                      }
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

                                {errorMessage && (
                                  <p className="text-red-500 mt-4">
                                    {errorMessage}
                                  </p>
                                )}

                                <DialogFooter>
                                  <Button
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
                        )}
                      </>
                    )}
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

import Footer from "@/components/Footer";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ClipLoader } from "react-spinners";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Space {
  _id: string;
  name: string;
  description: string;
  availability: string;
  price?: number; // Optional field if price might not be present
  image?: { url: string }; // Optional image field
  createdAt: string; // Date of creation as string
  amenities: [];
  location: string;
}

const Office = () => {
  const [loading, setLoading] = useState(false); //state for loading
  const [space, setSpace] = useState<Space | null>(null); // Single space, initialized as null
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
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
      name,
      email,
      phoneNumber: phone,
      startDate: checkInDate,
      startTime: checkInTime,
      endDate: checkOutDate,
      endTime: checkOutTime,
      space_id: space?._id, // Assuming you're using `space` to refer to the current space
      totalPrice: space?.price, // Assuming the price comes from the space
    };

    try {
      await axios.post("http://localhost:3000/book", bookingData);
      setIsBooked(true); // Show success message
    } catch {
      setErrorMessage("Booking failed. Please try again."); // Show error message
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
                  <Button variant={"primary"} className="">
                    Reserve
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
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="booking">Booking</TabsTrigger>
                              <TabsTrigger value="payment">
                                Payment
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent value="booking">
                         
                              <form
                                    onSubmit={handleSubmit}
                                    className="mt-4"
                                  >
                                    <div className="grid gap-4 py-4">
                                      <h1>{space?.name}</h1>
                                      <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                          id="name"
                                          value={name}
                                          onChange={(e) =>
                                            setName(e.target.value)
                                          }
                                          className="col-span-3"
                                          required
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 items-center gap-4">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                          id="email"
                                          value={email}
                                          onChange={(e) =>
                                            setEmail(e.target.value)
                                          }
                                          className="col-span-3"
                                          required
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 items-center gap-2">
                                        <Label htmlFor="phone">
                                          Phone number
                                        </Label>
                                        <Input
                                          id="phone"
                                          value={phone}
                                          onChange={(e) =>
                                            setPhone(e.target.value)
                                          }
                                          className="col-span-3"
                                          required
                                        />
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                                      <div>
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
                                      </div>
                                      <div>
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
                                      </div>
                                      <div>
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
                                      </div>
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
                                        className="w-full mt-4"
                                      >
                                        Book now!
                                      </Button>
                                    </DialogFooter>
                                  </form>  
                                
                         
                            </TabsContent>
                            <TabsContent value="payment">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Payment</CardTitle>
                                  <CardDescription>
                                    Change your password here. After saving,
                                    you'll be logged out.
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  <div className="space-y-1">
                                    <Label htmlFor="current">
                                      Current password
                                    </Label>
                                    <Input id="current" type="password" />
                                  </div>
                                  <div className="space-y-1">
                                    <Label htmlFor="new">New password</Label>
                                    <Input id="new" type="password" />
                                  </div>
                                </CardContent>
                                <CardFooter>
                                  <Button>Save password</Button>
                                </CardFooter>
                              </Card>
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
          <div>
            <img
              src={space?.image?.url || "/placeholder.svg"}
              alt={space?.name || "Image"}
              width="1920"
              height="1080"
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale p-8 rounded-md"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Office;

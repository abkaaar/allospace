import { ChevronLeft, Loader2, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MultipleSelector, { Option } from "@/components/multiple-select";
import { Textarea } from "@/components/ui/textarea";
import UploadImage from "@/components/UploadImage";
// import { useCookies } from "react-cookie";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useCookies } from "react-cookie";

const BACKEND_URL = import.meta.env.VITE_APP_URL;

const OPTIONS: Option[] = [
  { label: "WiFi", value: "wifi" },
  { label: "Projector", value: "projector" },
  { label: "Air Conditioning", value: "air_conditioning" },
  { label: "Whiteboard", value: "whiteboard" },
  { label: "Sound System", value: "sound_system" },
  { label: "Video Conferencing", value: "video_conferencing" },
  { label: "Coffee Machine", value: "coffee_machine" },
  { label: "Printer", value: "printer" },
  { label: "Parking", value: "parking" },
  { label: "Elevator", value: "elevator" },
  { label: "Accessible Facilities", value: "accessible_facilities" },
];

export function UpdateSpace() {
  const [cookies] = useCookies(["token"]);
  const { user } = useAuthContext();
  // states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [term, setTerm] = useState("");
  const [availability, setAvailability] = useState("");
  const [preImages, setPreImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  // const [isLoading, setLoading] = useState<boolean>(false);
  const [btnLoading, setbtnLoading] = useState(false); //state for loading

  const navigate = useNavigate();
  const { id } = useParams();


  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const selectedFiles = Array.from(files); // Convert to array
      setImages(selectedFiles); // Update state with selected files
    }
  };

  useEffect(() => {
    // setLoading(true);
    const fetchSpace = async () => {
      try {
        axios.get(`${BACKEND_URL}/space/${id}`).then((response) => {
          setName(response.data.name);
          setDescription(response.data.description);
          setAddress(response.data.address);
          setPrice(response.data.price);
          setType(response.data.type);
          setTerm(response.data.term);
          setCapacity(response.data.capacity);

          const amenitiesString = response.data.amenities[0] || ""; // Extract the string
          // Clean the string by removing unwanted characters: brackets, quotes, and extra spaces
          const cleanedAmenities = amenitiesString
            // eslint-disable-next-line no-useless-escape
            .replace(/[\[\]"']/g, "") // Remove brackets and quotes
            .split(",") // Split by commas to create an array
            .map((item: string) => item.trim()); // Trim whitespace from each item

          setAmenities(cleanedAmenities);

          setAvailability(response.data.availability);

          if (response.data.images && Array.isArray(response.data.images)) {
            setPreImages(response.data.images.map((img: { url: string }) => img.url)); // Store all image URLs
          } else if (response.data.image && response.data.image.url) {
            setPreImages([response.data.image.url]); // Store single image as an array
          }
        });
      } catch (error) {
        alert("An error happened. Please Check console");
        console.log(error);
      }
    };
    if (user) {
      fetchSpace(); // Call the function to fetch spaces
    }
  }, [user, cookies, id]);

  // submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = cookies.token || localStorage.getItem("token");

    if (!token) {
      console.log("No token found in cookies");
      console.log(token)
      return;
    }
    // Create a FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("capacity", capacity);
    formData.append("address", address);
    formData.append("price", price);
    formData.append("term", term);
    formData.append("type", type);
    formData.append("availability", availability);
    formData.append("amenities", JSON.stringify(amenities)); // Assuming amenities is an array

    images.forEach((image) => formData.append("images", image));

    try {
      setbtnLoading(true); // start loading
      const { data } = await axios.put(
        `${BACKEND_URL}/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const { success, message } = data;
      if (success) {
        navigate("/spaces");
      } else {
        console.log("Update error", message);
        setbtnLoading(false); // start loading
      }
    } catch (error) {
      console.log("Error occured:", error);
      setbtnLoading(false); // start loading
    }
  };

  // amenity array
  const handleAmenityChange = (selectedOptions: Option[]) => {
    setAmenities(selectedOptions.map((option) => option.value));
  };

  const deleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const deletePreImage = (index: number) => {
    setPreImages((prev) => prev.filter((_, i) => i !== index)); // Filter out by index
  };

  // const userAddress = user?.address || "";
  const companyName = user?.companyName;
  // Auto-update the space name when type changes
  useEffect(() => {

    if (type && companyName) {
      setName(`${type} - ${companyName}`);
    }
    // if (userAddress) {
    //   setAddress(userAddress);
    // }
  }, [type, companyName,
    //  userAddress
  ]);

  return (
    <>
      {" "}
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <form
          onSubmit={handleSubmit}
          className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
        >
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button
                size="sm"
                type="submit"
                variant={"primary"}
                disabled={btnLoading}
              >
                {btnLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Save Space"
                )}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Space Details</CardTitle>
                  <CardDescription>
                    Update space information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={name}
                        disabled
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="w-full"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        onValueChange={(value) => setType(value)}
                        value={type} // Bind to form state
                      >
                        <SelectTrigger id="type" aria-label="Select type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Office">Office</SelectItem>
                          <SelectItem value="Dedicated desk">
                            Dedicated desk
                          </SelectItem>
                          <SelectItem value="Event space">Event space</SelectItem>
                          <SelectItem value="Coworking space">
                            Coworking space
                          </SelectItem>
                          <SelectItem value="Conference room">
                            Conference room
                          </SelectItem>
                          <SelectItem value="Meeting room">
                            Meeting room
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                        className="min-h-32"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        type="text"
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                        disabled
                        value={address}
                        defaultValue="Road 200 of bay area, delaware US"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        name="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        defaultValue="0"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        defaultValue="0"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amenities">Amenities</Label>
                      <Select>
                        <MultipleSelector

                          defaultOptions={OPTIONS}
                          placeholder="Select amenities..."
                          creatable
                          onChange={handleAmenityChange}
                          value={amenities.map((value) => ({
                            label:
                              OPTIONS.find((option) => option.value === value)
                                ?.label || value,
                            value,
                          }))}
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600">
                              no results found.
                            </p>
                          }
                        />
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Space details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        onValueChange={(value) => setAvailability(value)}
                        value={availability} // Bind to form state
                      >
                        <SelectTrigger
                          id="availability"
                          aria-label="Select status"
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="unavailable">
                            Unavailable
                          </SelectItem>
                          <SelectItem value="reserved">Reserved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="status">Term</Label>
                      <Select
                        onValueChange={(value) => setTerm(value)}
                        value={term} // Bind to form state
                      >
                        <SelectTrigger id="term" aria-label="Select term">
                          <SelectValue placeholder="Select term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Space Images</CardTitle>
                  <CardDescription>Upload your space images.</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <div className="grid gap-2">
                    {/* Conditional rendering for image preview 
                    {image ? (
                      // Preview the newly uploaded image
                      <img
                        alt="Uploaded image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src={URL.createObjectURL(image)} // Create object URL for the new image
                        width="84"
                      />
                    ) : (
                      preImage && (
                        // Preview the existing image if no new image is uploaded
                        <div className="flex relative">
                          <img
                            alt="Existing space image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src={preImage}
                            width="50"
                          />
                          <XIcon
                            onClick={deleteImage}
                            className="absolute right-0 bg-white m-1 rounded-full cursor-pointer"
                          />
                        </div>
                      )
                    )}

                    <div className="grid grid-cols-3 gap-2">
                      <UploadImage
                        onChange={handleFileChange} // Pass handleFileChange to update the state
                        placeholder="/o.svg" // Optional placeholder image
                      />
                    </div>
                  </div> */}
                  <div className="grid gap-2">
                    {/* Display newly uploaded images */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {images.map((image, index) => (
                          <div key={index} className="flex relative">
                            <img
                              alt={`Uploaded image ${index + 1}`}
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              width="84"
                              src={URL.createObjectURL(image)} // Preview uploaded image
                            />
                            <XIcon
                              onClick={() => deleteImage(index)} // Delete uploaded image
                              className="absolute right-0 bg-white m-1 rounded-full cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    )}




                    {/* Display pre-existing images */}
                    {preImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {preImages.map((image, index) => (
                          <div key={index} className="flex relative">
                            <img
                              alt={`Existing image ${index + 1}`}
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              width="84"
                              src={image} // Display pre-existing image from URL or path
                            />
                            <XIcon
                              onClick={() => deletePreImage(index)} // Delete pre-existing image
                              className="absolute right-0 bg-white m-1 rounded-full cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    )}


                    <div className="grid grid-cols-3 gap-2">
                      <UploadImage
                        onChange={handleFileChange} // Handle file input changes
                        placeholder="/upload.webp" // Optional placeholder image
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm" type="submit" disabled={btnLoading}>
              {btnLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Save Space"
              )}
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}

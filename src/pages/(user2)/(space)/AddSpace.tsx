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
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MultipleSelector, { Option } from "@/components/multiple-select";
import { useCookies } from "react-cookie";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Textarea } from "@/components/ui/textarea";
import UploadImage from "@/components/UploadImage";

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

const BACKEND_URL = import.meta.env.VITE_APP_URL;

export function AddSpace() {
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
  const [images, setImages] = useState<File[]>([]);

  const [loading, setLoading] = useState(false); //state for loading
  const [cookies] = useCookies(["token"]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleError = (err: string) =>
    toast.error(err, {
      position: "bottom-left",
    });

  // const handleFileChange = (file: File | null) => {
  //   if (file) {
  //     setImage(file); // Assuming you want to handle only the first file
  //   }
  // };

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const selectedFiles = Array.from(files);
      setImages(selectedFiles); // Set images array in state
    }
  };

  // submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      console.log("Not user");
      return;
    }

    const token = cookies.token || localStorage.getItem("token");


    if (!token) {
      console.log("No token found in cookies");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("capacity", capacity);
    formData.append("address", address);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("term", term);
    formData.append("availability", availability);
    formData.append("amenities", JSON.stringify(amenities)); // Assuming amenities is an array


    images.forEach((image) => formData.append("images", image));

    try {
      setLoading(true); // start loading
      const { data } = await axios.post(
        `${BACKEND_URL}/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true,
        }
      );

      const { success, message } = data;
      if (success) {
        navigate("/spaces");
      } else {
        handleError(message);
        setLoading(false); // start loading
      }
    } catch (error) {
      console.log("Error occured:", error);
      setLoading(false); // start loading
    }
  };

  // amenity array
  const handleAmenityChange = (selectedOptions: Option[]) => {
    setAmenities(selectedOptions.map((option) => option.value));
  };

  // const deleteImage = () => {
  //   setImage(null);
  // };
  const deleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const userAddress = user?.address || "";
  const companyName = user?.companyName;
  // Auto-update the space name when type changes
  useEffect(() => {
    
    if (type && companyName) {
      setName(`${type} - ${companyName}`);
    }
    if (userAddress) {
      setAddress(userAddress);
    }
  }, [type, companyName, userAddress]);

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
              {/* <Button variant="outline" size="sm">
                Discard
              </Button> */}
              <Button
                size="sm"
                type="submit"
                variant={"primary"}
                disabled={loading}
              >
                {loading ? (
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
                  Put down your space information.
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
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="w-full"
                        disabled
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="type">Space type</Label>
                      <Select
                        onValueChange={(value) => setType(value)}
                        value={type} // Bind to form state
                      >
                        <SelectTrigger id="type" aria-label="Select type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Office">Office</SelectItem>
                          <SelectItem value="Coworking space">
                            Coworking space
                          </SelectItem>
                          <SelectItem value="Conference room">
                            Conference room
                          </SelectItem>
                          <SelectItem value="Meeting room">
                            Meeting room
                          </SelectItem>
                          <SelectItem value="Dedicated desk">
                            Dedicated desk
                          </SelectItem>
                          <SelectItem value="Event space">
                            Event space
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
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
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
                  <CardTitle>Space images</CardTitle>
                  <CardDescription>upload the space images</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <div className="grid gap-2">
                    {/* <img
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="300"
                      src="/placeholder.svg"
                      width="300"
                    /> 
                     You can display the uploaded images here if needed 
                     {images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {Array.from(images).map((image, index) => (
                         
                        ))}
                      </div>
                    )} 
                    {images && (
                      <div className="flex relative">
                        <img
                          alt="Uploaded image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="84"
                          src={URL.createObjectURL(image)} // Use URL.createObjectURL to display the image
                          width="84"
                        />
                        <XIcon
                          onClick={() => deleteImage(index)}
                          className="absolute right-0 bg-white m-1 rounded-full cursor-pointer"
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-2">
                      <UploadImage className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                        </UploadImage> 
                      <UploadImage
                        onChange={handleFileChange} // Pass handleFileChange to update the state
                        placeholder="/upload.webp" // Optional placeholder image
                      />
                    </div>
                  </div> */}
                  <div className="grid gap-2">
                    {/* {images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {images.map((image, index) => (
                          <div key={index} className="flex relative">
                            <img
                              alt={`Uploaded image ${index + 1}`}
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              width="84"
                              src={URL.createObjectURL(image)} // Display each uploaded image
                            />
                            <XIcon
                              onClick={() => deleteImage(index)} // Delete specific image
                              className="absolute right-0 bg-white m-1 rounded-full cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    )} */}
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
            {/* <Button variant="outline" size="sm">
              Discard
            </Button> */}
            <Button
              size="sm"
              type="submit"
              variant={"primary"}
              disabled={loading}
            >
              {loading ? (
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

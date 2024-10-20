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
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [term, setTerm] = useState("");
  const [availability, setAvailability] = useState("");
  const [preImage, setPreImage] = useState("");
  const [image, setImage] = useState<File | null>();
  // const [isLoading, setLoading] = useState<boolean>(false);
  const [btnLoading, setbtnLoading] = useState(false); //state for loading

  const navigate = useNavigate();
  const { id } = useParams();

  const handleFileChange = (file: File | null) => {
    if (file) {
      setImage(file); // set the new image
      setPreImage(""); // Clear the existing image from the preview
    }
  };

  useEffect(() => {
    // setLoading(true);
    const fetchSpace = async () => {
      try {
        axios.get(`http://localhost:3000/user/space/${id}`).then((response) => {
          // console.log(response.data.image.url);
          setName(response.data.name);
          setDescription(response.data.description);
          setLocation(response.data.location);
          setPrice(response.data.price);
          setType(response.data.type);
          setTerm(response.data.term);
          setCapacity(response.data.capacity);

          // setAmenities(response.data.amenities);
          // Parse amenities if they are a string
          const amenities =
            typeof response.data.amenities === "string"
              ? JSON.parse(response.data.amenities)
              : response.data.amenities;
          setAmenities(amenities); 

          setAvailability(response.data.availability);
          // Handle image URL properly
          if (response.data.image && response.data.image.url) {
            setPreImage(response.data.image.url);
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

    const token = cookies.token;

    if (!token) {
      console.log("No token found in cookies");
      return;
    }
    // Create a FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("capacity", capacity);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("term", term);
    formData.append("type", type);
    formData.append("availability", availability);
    formData.append("amenities", JSON.stringify(amenities)); // Assuming amenities is an array
    if (image) {
      formData.append("image", image);
    }

    try {
      setbtnLoading(true); // start loading
      const { data } = await axios.put(
        `http://localhost:3000/user/space/edit/${id}`,
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

  const deleteImage = () => {
    setPreImage("");
  };

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
                    Lipsum dolor sit amet, consectetur adipiscing elit
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
                      />
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
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        type="text"
                        name="location"
                        onChange={(e) => setLocation(e.target.value)}
                        // onChange={handleOnChange}
                        value={location}
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
                      <Label htmlFor="type">Type</Label>
                      <Select
                        onValueChange={(value) => setType(value)}
                        value={type} // Bind to form state
                      >
                        <SelectTrigger id="type" aria-label="Select type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="coworking space">
                            Coworking space
                          </SelectItem>
                          <SelectItem value="conference room">
                            Conference room
                          </SelectItem>
                          <SelectItem value="meeting room">
                            Meeting room
                          </SelectItem>
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
                          <SelectItem value="montly">Monthly</SelectItem>
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
                  <div className="grid gap-2">
                    {/* Conditional rendering for image preview */}
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
                        placeholder="/placeholder.svg" // Optional placeholder image
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

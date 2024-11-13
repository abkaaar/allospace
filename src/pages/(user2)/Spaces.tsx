// import Layout from "./Layout";

import { File, ListFilter, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Skeleton } from "@/components/ui/skeleton";
const BACKEND_URL = import.meta.env.VITE_APP_URL || "http://localhost:3000";
interface Space {
  _id: string;
  name: string;
  availability: string;
  capacity: string;
  price?: number; // Optional field if price might not be present
  images?: [{ url: string }]; // Optional image field
  createdAt: string; // Date of creation as string
}

export function Spaces() {
  const [spaces, setSpaces] = useState<Space[]>([]); // Use state to store the spaces
  const [cookies] = useCookies(["token"]);
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false); // Track transition state

  // Fetch the spaces on component mount
  useEffect(() => {
    const fetchSpaces = async () => {
      const token = cookies.token;
      console.log("Token:", token); // Debug log to verify token value
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${BACKEND_URL}/user/spaces`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true, 
        });

        if (data.success) {
          setSpaces(data.data); // Update the spaces state with the fetched data
          setIsLoading(false);
        }
      } catch (error) {
        console.error("API call error:", error);
      }
    };
    if (user) {
      fetchSpaces(); // Call the function to fetch spaces
    }
  }, [cookies.token, user]);

  // delete
  const handleDelete = async (id: string) => {
    try {
      const { data } = await axios.delete(
        `${BACKEND_URL}/user/${id}`
      );

      if (data.success) {
        setSpaces((spaces) => {
          return spaces.filter((space) => space._id !== id);
        });
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Delete API call error:", error);
      alert("Failed to delete space");
    }
  };

  return (
    <>
      {" "}
      <main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Your Spaces</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Introducing Our Seamless space Management and Insightful
                  Analysis.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/add-space">
                  {" "}
                  <Button variant={"primary"}>Add New Space</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList className="gap-1">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Capacity
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created at
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      // Show skeleton rows if loading
                      Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Skeleton className="w-16 h-16 rounded-md" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="w-32 h-4" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="w-20 h-4" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="w-16 h-4" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="w-24 h-4" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="w-12 h-4" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : spaces.length > 0 ? (
                      spaces.map((space) => (
                        <TableRow key={space._id}>
                          <TableCell className="hidden sm:table-cell">
                            <img
                              alt="Product image"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              // src="./placeholder.svg"
                              src={space.images?.[0].url}
                              width="64"
                            />
                            {/* {space.image && (
                            <img
                              alt="Uploaded image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src={URL.createObjectURL(space.image.url)} // Use URL.createObjectURL to display the image
                              width="84"
                            />
                          )} */}
                          </TableCell>
                          <TableCell className="font-medium">
                            {space.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {space.availability}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          ₦{space.price}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {space.capacity}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {space.createdAt}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <Link to={`/edit/${space._id}`}>
                                  <DropdownMenuItem className="cursor-pointer">
                                    Edit
                                  </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() => handleDelete(space._id)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          No products found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      {/* <Layout>
    
      </Layout> */}
    </>
  );
}

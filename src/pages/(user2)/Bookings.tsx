import { File, ListFilter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useAuthContext } from "@/hooks/useAuthContext";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const BACKEND_URL = import.meta.env.VITE_APP_URL;

interface Space {
  name: string;
  // Add more fields if needed
}

interface Book {
  _id: string;
  name: string;
  email: string;
  totalPrice?: number; // Optional field if price might not be present
  createdAt: string;
  space_id?: Space; // Include space_id as an optional field
}

export function Bookings() {
  const [bookings, setBookings] = useState<Book[]>([]); // Use state to store the spaces
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [cookies] = useCookies(["token"]);
  const { user } = useAuthContext();
  const [token, setToken] = useState<string | null>(null);

  // Sync token from cookies when available
  useEffect(() => {
    const syncToken = () => {
      if (cookies.token) {
        console.log("Cookie token found:", !!cookies.token); // Safe logging
        setToken(cookies.token);
      } else {
        // Try getting token from the response if cookie method failed
        const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
          setToken(tokenFromStorage);
          console.log("Retrieved token from storage");
        } else {
          console.log("No token available");
          setToken(null);
        }
      }
    };

    syncToken();
  }, [cookies.token]);

  // Fetch the spaces on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) return;  // Only proceed if token is available
      try {
        setIsLoading(true);
        const  response  = await axios.get(`${BACKEND_URL}/user/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true,
        });
      console.log("token:", token);

        if (response.data.success) {
          setBookings(response.data.data); // Update the spaces state with the fetched data
        } else {
          console.error("Error:", response.data.message);
        }
      } catch (error) {
        if(axios.isAxiosError(error)){
           console.error("API Error Details:", {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
          });
        }
        console.error("API call error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetchBookings(); // Call the function to fetch spaces
    }
  }, 
  [token, user]);



  return (
    <>
      {" "}
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Tabs defaultValue="week">
            <div className="flex items-center">
              <TabsList className="gap-1">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Fulfilled
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Declined
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Refunded
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              </div>
            </div>
            <TabsContent value="week">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                  <CardTitle>Bookings</CardTitle>
                  <CardDescription>
                    Recent bookings from your store.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {
                  isLoading ? (
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
                          <Skeleton className="w-20 h-4 hidden md:table-cell" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-16 h-4 hidden md:table-cell" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-24 h-4 hidden md:table-cell" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-12 h-4 hidden md:table-cell" />
                        </TableCell>
                      </TableRow>
                    ))
                  ):
               
                  bookings.length === 0 ?
                   (
                    <div className="bg-slate-100 h-20 flex items-center justify-center">
                      <h3>No bookings yet</h3>
                    </div>
                  )
                
                  : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>

                          <TableHead className="hidden sm:table-cell">
                            Space
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <div className="animate-pulse space-y-4">
                            {[...Array(5)].map((_, index) => (
                              <div
                                key={index}
                                className="h-8 bg-gray-200 rounded-md"
                              ></div>
                            ))}
                          </div>
                        ) : (
                          bookings.map((book) => (
                            <TableRow key={book._id}>
                              <TableCell>
                                <div className="font-medium">{book.name}</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                  {book.email}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                {book.space_id?.name ?? "N/A"}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                Sale
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                  Fulfilled
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {new Date(book.createdAt).toLocaleTimeString()}
                              </TableCell>
                              <TableCell className="text-right">
                                 {book.totalPrice}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  )
                }
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div></div>
      </main>
    </>
  );
}

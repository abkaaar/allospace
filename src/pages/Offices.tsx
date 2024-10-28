import Footer from "@/components/Footer";
import Nav from "../components/Nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import // Activity, CreditCard,
// DollarSign,
// Users
"lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface Space {
  _id: string;
  name: string;
  description: string;
  availability: string;
  price?: number; // Optional field if price might not be present
  image?: { url: string }; // Optional image field
  createdAt: string; // Date of creation as string
}

const Offices = () => {
  const [spaces, setSpaces] = useState<Space[]>([]); // Use state to store the spaces
  const [isLoading, setIsLoading] = useState(false); // Track transition state

  // Fetch the spaces on component mount
  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get("http://localhost:3000/spaces", {});

      if (data.success) {
        setSpaces(data.data); // Update the spaces state with the fetched data
        setIsLoading(false);

      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  // Display loading state
  if (isLoading) {
    return (
      <>
        <Nav />
        <main>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 p-12">
          <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div><div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div><div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
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
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 p-12">
          {spaces.map((space) => (
            <Link to={`/space/${space._id}`} key={space._id}>
              <Card x-chunk="dashboard-01-chunk-0">
                <img
                  src={space.image?.url}
                  alt="office"
                  style={{
                    height: "200px",
                    width: "100%",
                    objectFit: "cover",
                    backgroundSize: "cover",
                  }}
                />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {space.name}
                  </CardTitle>
                  <Badge variant="destructive">{space.availability}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-md font-bold">${space.price}</div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* <Card x-chunk="dashboard-01-chunk-1">
          <img src="/offices/2.jpg" alt="office" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-md font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
          <img src="/offices/3.jpg" alt="office" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-md font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
          <img src="/offices/4.jpg" alt="office" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-md font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card> <Card x-chunk="dashboard-01-chunk-3">
          <img src="/offices/5.jpg" alt="office" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-md font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card> */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Offices;

// import Layout from "./Layout";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { useAuthContext } from "@/hooks/useAuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const BACKEND_URL = import.meta.env.VITE_APP_URL;

export function Dashboard() {
  const { user } = useAuthContext();
  const [cookies] = useCookies(["token"]);
  const [token, setToken] = useState<string | null>(null);

  // const [bookings, setBookings] = useState<Booking[]>([]);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  interface Booking {
    totalPrice: number; 
    // Add other properties if needed
  }
  interface CurrencyConfig {
    locale: string;
    currency: string;
  }

  const getCurrencyConfigByCountry = (country: string): CurrencyConfig => {
    switch (country.toLowerCase()) {
      case 'nigeria':
        return { locale: 'en-NG', currency: 'NGN' };
      case 'ghana':
        return { locale: 'en-GH', currency: 'GHS' };
      // Add more countries as needed
      default:
        return { locale: 'en-US', currency: 'USD' };
    }
  };
  
  // Sync token from cookies when available
  useEffect(() => {
    const syncToken = () => {
      if (cookies.token) {
        console.log("Cookie token found:", !!cookies.token); // Safe logging
        setToken(cookies.token);
      } else {
        // Try getting token from the response if cookie method failed
        const tokenFromStorage = localStorage.getItem("token");
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

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        setError("No authentication token available");
        return;
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/user/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (response.data.success) {
          const fetchedBookings = response.data.data;
          // setBookings(fetchedBookings);
          
          // Calculate total bookings
          setTotalBookings(fetchedBookings.length);
          // Optional: Calculate additional statistics
          const statistics = calculateBookingStatistics(fetchedBookings);
          console.log('Booking Statistics:', statistics);
          
           // Calculate total earnings
           const earnings = fetchedBookings.reduce((total: number, booking: Booking) => {
            return total + (booking.totalPrice || 0); // Use 0 if totalPrice is undefined
          }, 0);
          
          setTotalEarnings(earnings);

        } else {
          setError(response.data.message);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to fetch bookings');
        } else {
          setError('An unexpected error occurred');
        }
      } 
    };

    fetchBookings();
  }, [token, user]);

 
  // Helper function to calculate additional statistics if needed
 const calculateBookingStatistics = (bookings: Booking[]) => {
  return {
    total: bookings.length,
    // Add more calculations as needed, for example:
    // activeBookings: bookings.filter(b => b.status === 'active').length,
    // completedBookings: bookings.filter(b => b.status === 'completed').length,
  
  };
};

// Format currency
const formatCurrency = (amount: number) => {
  const config = getCurrencyConfigByCountry(user?.country || 'US');
  
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency
  }).format(amount);
};
  if (!user) {
    return <h1>Please log in to access the dashboard</h1>;
  }

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Welcome, <span>{user.name}</span>
        </h1>
      </div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          {/* {error && <p className="error">{error}</p>} */}
          <div className="text-red-500">{error} </div>
         
          <div className="grid gap-4 sm:grid-cols-2 ">
          
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>Total earnings </CardDescription>
                <CardTitle className="text-4xl">
                  {formatCurrency(totalEarnings)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +0% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={5} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2" className="">
              <CardHeader className="pb-2">
                <CardDescription>Total bookings</CardDescription>
                <CardTitle className="text-4xl">{totalBookings}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +0% from last month
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={5} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </div>
        </div>
        <div></div>
      </main>
      {/* <Layout>
      
      </Layout> */}
    </>
  );
}

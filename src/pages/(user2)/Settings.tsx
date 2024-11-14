import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const BACKEND_URL = import.meta.env.VITE_APP_URL;
export function Settings() {
  const [cookies] = useCookies(["token"]);

  const [formValue, setFormValue] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    address: "",
    companyName: "",
    country: "",
    city: "",
  });
  // const { email, password, address, name, companyName, phone, country, city } = formValue;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = cookies.token;
        const response = await axios.get(
          `${BACKEND_URL}/api/auth/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in headers
            },
          }
        );
        setFormValue(response.data.user); // Set user data into state
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error(err);
        console.log(err);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchUserData();
  }, [cookies.token]);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the input field
    }));
  };

  // Handle form submission to update user information
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BACKEND_URL}/api/auth/user/update`, // Update endpoint
        formValue, // Send the updated data
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUser = response.data.user;
      setFormValue(updatedUser);
      setSuccess("User information updated successfully!");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to update user information.");
      console.error(err);
    }
  };

  interface Bank {
    code: string;
    name: string;
  }

  // payment details
  const [banks, setBanks] = useState<Bank[]>([]);
  const [paymentValue, setPaymentValue] = useState({
    email: formValue.email,
    name: formValue.name,
    bank: "",
    account_number: "",
  });

  useEffect(() => {
    setPaymentValue((prev) => ({
      ...prev,
      email: formValue.email,
      name: formValue.name,
    }));
  }, [formValue]);

  useEffect(() => {
    // Fetch bank list directly from Paystack on the frontend
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://api.paystack.co/bank", {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
          },
        });
        setBanks(response.data.data); // Assuming response.data.data contains the bank array
      } catch (error) {
        console.error("Error fetching bank list:", error);
      }
    };
    fetchBanks();
  }, []);

  // Handle input changes
  const handlePaymentChange = (e: ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentValue((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the input field
    }));
  };

  const paymentHandleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BACKEND_URL}/api/auth/payment`, // Update endpoint
        paymentValue, // Send the updated data
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUser = response.data.user;
      setPaymentValue(updatedUser);
      setSuccess("User payment information updated successfully!");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to update user information.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="companyName">Company name</Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="Clever Co"
                      required
                      name="companyName"
                      value={formValue.companyName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Musa"
                      required
                      name="name"
                      value={formValue.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      name="email"
                      value={formValue.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      type="phone"
                      placeholder="+234 000 00000"
                      required
                      name="phone"
                      value={formValue.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">Address</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Kur Mohammer Avenue, CBD Abuja"
                      required
                      name="address"
                      value={formValue.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      type="text"
                      placeholder="Nigeria"
                      required
                      name="country"
                      value={formValue.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder=" e.g lagos"
                      required
                      name="city"
                      value={formValue.city}
                      onChange={handleChange}
                    />
                  </div>

                  <Button
                    variant={"primary"}
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "updating user info..." : "save changes"}
                  </Button>
                  {error && <div className="error-message">{error}</div>}
                  {!error && success && (
                    <div className="success-message">{success}</div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment details</CardTitle>
              <CardDescription>
                Provide your business payment details below for you to recieve
                your earnings, please make sure you input the correct details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={paymentHandleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Business/Company Name</Label>
                  <Input
                    id="name"
                    type="text"
                    // placeholder="John Musa"
                    required
                    name="name"
                    value={formValue.name}
                    onChange={handlePaymentChange}
                    disabled
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    // placeholder="John Musa"
                    required
                    name="email"
                    value={formValue.email}
                    onChange={handlePaymentChange}
                    disabled
                  />
                </div>
                {/* <div className="grid gap-2">
                <Label htmlFor="bank">Bank Name</Label>
                <Input
                      id="bank"
                      type="text"
                      placeholder="i.e First bank of Nigeria"
                      required
                      name="bank"
                      value={paymentValue.bank}
                      onChange={handlePaymentChange}
                    />
              </div> */}
                <div className="grid gap-2">
                  <label htmlFor="bank">Bank Name</label>
                  <select
                    id="bank"
                    name="bank"
                    className="w-full"
                    required
                    value={paymentValue.bank}
                    onChange={handlePaymentChange}
                  >
                    <option value="">Select Bank</option>
                    {banks.map((bank) => (
                      <option key={bank.code} value={bank.code}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="account_number">Account number</Label>
                  <Input
                    id="account_number"
                    type="text"
                    placeholder="i.e 1234567890"
                    required
                    name="account_number"
                    value={paymentValue.account_number}
                    onChange={handlePaymentChange}
                  />
                </div>
                <Button
                  variant={"primary"}
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Saving user details..." : "save changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

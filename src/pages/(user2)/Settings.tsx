import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

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
        const response = await axios.get("http://localhost:3000/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        });
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
        "http://localhost:3000/auth/user/update", // Update endpoint
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

  return (
    <div className="flex justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
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
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="******"
                  required

                  // onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant={"primary"}>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

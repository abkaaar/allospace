import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Nav from "../components/Nav";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRegister } from "@/hooks/use-register";
import Footer from "@/components/Footer";

const RegisterPage = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    name:"",
    phone: "",
    password: "",
  });
  const { name, email, password, phone } = formValue;

  const navigate = useNavigate();
  const { register, isLoading, error } = useRegister();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await register(formValue);

    if (result.success) {
       toast.success("Registration successful!", {
        position: "bottom-right",
        
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
     
    } else {
      toast.error("Error on-going", {
        position: "bottom-left",
      });
    }
    setFormValue({
      ...formValue,
      name:"",
      email: "",
      phone: "",
      password: "",
    });
  };

  return (
    <>
      <Nav />
      <div className="my-24 ">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
              <div className="grid gap-2">
                  <Label htmlFor="email">Fullname</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Musa"
                    required
                    name="name"
                    value={name}
                    onChange={handleOnChange}
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
                    value={email}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 000 000"
                    required
                    name="phone"
                    value={phone}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="******"
                    required
                    value={password}
                    onChange={handleOnChange}
                  />
                </div>
                <Button variant={"primary"} type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating an account..." : "Create an account"}
                </Button>
                {error && (
                  <div className="error-message">{error}</div> // Display error message if needed
                )}
                <Button variant="outline" className="w-full">
                  Sign up with Google
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer/>
      <ToastContainer />
    </>
  );
};

export default RegisterPage;

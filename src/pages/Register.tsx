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
import { useRegister } from "@/hooks/use-register";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const RegisterPage = () => {
  const { register, isLoading, error } = useRegister();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword, phone } = formValue;

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!name) {
      errors.name = "Name is required";
      isValid = false;
    } else if (name.length < 3) {
      errors.name = "Name must be at least 3 characters";
      isValid = false;
    }
    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }
    if (!phone) {
      errors.phone = "Phone number is required";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.password = "Password do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: "", // Clear error message when user starts typing
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await register(formValue);

    if (result.success) {
      toast({
        title: "Registration successful!",
        description: " welcome to Allospace",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      toast({
        title: "Unable to register",
        description: "make sure your details are correct and Please try again",
      });
    }
    setFormValue({
      ...formValue,
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <Nav type="non-search" />
      <div className="my-24 ">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-extrabold">Sign Up</CardTitle>
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
                    name="name"
                    value={name}
                    onChange={handleOnChange}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm">{formErrors.name}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 000 000"
                    name="phone"
                    value={phone}
                    onChange={handleOnChange}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm">{formErrors.phone}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={handleOnChange}
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-sm">
                      {formErrors.password}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="******"
                    value={confirmPassword}
                    onChange={handleOnChange}
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {formErrors.confirmPassword}
                    </p>
                  )}
                </div>
                <Button
                  variant={"primary"}
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating an account..." : "Create an account"}
                </Button>
                {error && (
                  <div className="error-message">{error}</div> // Display error message if needed
                )}
                {/* <Button variant="outline" className="w-full">
                  Sign up with Google
                </Button> */}
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
      <Footer />
    </>
  );
};

export default RegisterPage;

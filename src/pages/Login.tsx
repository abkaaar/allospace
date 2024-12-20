import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate,
  //  useNavigate 
  } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Nav from "../components/Nav";
import React, { useState } from "react";
import { useLogin } from "@/hooks/use-login";
import { Loader2 } from "lucide-react";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_APP_URL;
const Google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast(); 
  const { login, error, isLoading , setIsLoading } = useLogin();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formValue;

  const validateForm = () => {
    const errors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
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
    try {
      const success = await login(formValue); 
      if (success) {
        toast({ title: "Login successful", description: "Welcome back!" });
      } else {
        setIsLoading(false);
        toast({ title: "Error", description: error || "User might to register", variant: "destructive" });
      }
    } catch (err) {
      console.log(err);
      toast({ title: "Unexpected Error", description: "An unexpected error occurred", variant: "destructive" });
    }
    setFormValue({
      ...formValue,
      email: "",
      password: "",
    });
  };

  const handleGoogleSuccess = async (response: any) => {
   const googleToken = response.credential; // This is the credential from Google's response
   console.log(Google_client_id);
    try {
     
      const loginResponse = await axios.post(
        `${BACKEND_URL}/api/auth/google`,
        { token: googleToken },
        { withCredentials: true }
      );

      const user = loginResponse.data;
      const token = loginResponse.data.token;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token); // Save token

        navigate("/"); 
      }
      else {
        throw new Error("Login failed, no user or token received.");
      }
    } 
    catch (error: any) {
      toast({ title: "Google login failed", description: "Failed to login with Google. Please try again.", variant: "destructive" });
    }
  }

  const handleGoogleFailure = () => {
    toast({ title: "Google login failed", description: "Failed to login with Google. Please try again.", variant: "destructive" });
  };


  return (
    <>
      <Nav />
      <div className="flex justify-center my-24">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                  
                    onChange={handleOnChange}
                  />
                   {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forget-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={handleOnChange}
                  />
                   {formErrors.password && (
                    <p className="text-red-500 text-sm">{formErrors.password}</p>
                  )}
                </div>
                <Button variant={"primary"} type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />              
                  :
                   "Login"
                   }
                 
                </Button>
                <GoogleOAuthProvider clientId={Google_client_id}>
                     <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
          />

                </GoogleOAuthProvider>
             
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link,
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
import { toast, ToastContainer } from "react-toastify";
import { useLogin } from "@/hooks/use-login";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const { login, error, isLoading , setIsLoading } = useLogin();
  // const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formValue;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleError = (err: string) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg: string) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const success = await login(formValue); // Call the login function
    if (success) {
      handleSuccess("Login successful");
      // navigate("/"); // Navigate to the dashboard on success
      // navigate("/dashboard"); // Navigate to the dashboard on success
    } else {
      setIsLoading(false)
      handleError(error || "Error: user might need to register");
    }
    } catch (err) {
      console.log(err);
      handleError("An unexpected error occurred");
    }
    setFormValue({
      ...formValue,
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Nav />
      <div className="flex justify-center mt-24">
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
                    required
                    value={email}
                    onChange={handleOnChange}
                  />
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
                    required
                    value={password}
                    onChange={handleOnChange}
                  />
                </div>
                <Button variant={"primary"} type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />              
                  :
                   "Login"
                   }
                 
                </Button>
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
      <ToastContainer />
    </>
  );
};

export default LoginPage;

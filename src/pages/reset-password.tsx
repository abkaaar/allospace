import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Loader2 } from "lucide-react";
import axios from "axios";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [success, setSuccess] = useState<boolean>(false); // New state for success message
  const [formValue, setFormValue] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { confirmPassword, password } = formValue;

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

    if (password !== confirmPassword) {
        setFormValue({
          ...formValue,
          password: "",
          confirmPassword: "",
        });
        return handleError("Passwords don't match");
      }
      setIsLoading(true);

      try {
        const response = await axios.put(`http://localhost:3000/api/auth/passwordreset/${resetToken}`, { password });
        if (response.status === 200) {
          handleSuccess("Password reset successful!");
          setSuccess(true)
        }
      } catch (error) {
        console.error(error);
        handleError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
  
    setFormValue({
      ...formValue,
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <div className="flex justify-center mt-24">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Reset password</CardTitle>
            <CardDescription>
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent>
          {success ? ( // Conditional rendering based on success state
              <div className="text-center">
                <p>Password reset successfully!</p>
                <Link to="/login" className="underline text-blue-600">
                  Click here to log in
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
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
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      name="confirmPassword"
                      id="confirmPassword"
                      type="password"
                      placeholder="******"
                      required
                      value={confirmPassword}
                      onChange={handleOnChange}
                    />
                  </div>
                  <Button variant="primary" type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </div>
              </form>
            )}
          
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </>
  );
};

export default ResetPassword;

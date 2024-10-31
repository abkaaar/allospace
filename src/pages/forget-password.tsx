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
import axios from "axios";
import Footer from "@/components/Footer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

  const forgotPasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Clear previous messages
    setError("");
    setSuccess("");

    try {
      const { data } = await axios.post("http://localhost:3000/api/auth/forgotpassword", { email });
      setSuccess(data.data.message || "Email has beent sent to your inbox");
      setEmail("");
    } catch (error) {
        setIsSubmitting(false);
      console.error(error);
    //   setError(error.response.data.error);
    const message =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An error occurred. Please try again.";
      toast.error(message);
      setEmail("");
    } finally{
        setIsSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="flex justify-center my-24">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Reset password</CardTitle>
            <CardDescription>Please enter the email address you register your account with.
            We will send you reset password confirmation to this email</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={forgotPasswordHandler}
              className="grid gap-4"
            >
              {error && <span className="error-message">{error}</span>}
              {success && <span className="success-message">{success}</span>}
              <div className="form-group">
                <Label htmlFor="email">Email:</Label>
                <Input
                  type="email"
                  required
                  id="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" variant={"primary"} disabled={isSubmitting}>
                 {isSubmitting ? "Sending..." : "Send Email"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default ForgetPassword;

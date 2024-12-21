/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_APP_URL;
export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const register = async (formValue: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/register`,
        formValue,
        { withCredentials: true }
      );

      // Assuming the response contains the user data
      const user = response.data;

      // Save the user to localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: user });
      return {success: true};

    } catch (error: any) {
      // Extract error message or set a default one
      setError(error.response?.data?.error || "An error occurred");
      return {success: false};
    } finally {
      setIsLoading(false);
    }
  };

   // Google login function (using token from Google Sign-In)
   const loginWithGoogle = async (googleToken: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const loginResponse = await axios.post(
        `${BACKEND_URL}/api/auth/google`,
        { token: googleToken },
        { withCredentials: true }
      );

      const user = loginResponse.data.user;
      const token = loginResponse.data.token;

      if (user && token) {
        // Store user data and token in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token); // Save token
        dispatch({ type: "LOGIN", payload: { ...user } });
        navigate("/");
      } else {
        throw new Error("Google login failed, no user or token received.");
      }

      return true;
    } catch (error: any) {
      setError(error.response?.data?.error || "Google login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };


  return { register, isLoading, error, loginWithGoogle };
};

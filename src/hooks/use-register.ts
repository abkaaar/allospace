/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_APP_URL;
export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

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

  return { register, isLoading, error };
};

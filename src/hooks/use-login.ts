/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_APP_URL;

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  // const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  // const token = cookies.token;

  const login = async (formValue: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        formValue,
        { withCredentials: true }
      );

      const user = response.data.user;
      const token = response.data.token;
      const companyName = response.data.companyName;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token); // Save token

        dispatch({ type: "LOGIN", payload: { ...user, companyName } });

        if (user.role === "host") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
      return true;
    } catch (error: any) {
      setError(error.response?.data?.error || "An error occurred");
      return false;
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

  return { login, loginWithGoogle, isLoading, setIsLoading, error };
};

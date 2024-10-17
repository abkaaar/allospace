/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
// import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  // const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const token = cookies.token;

  const login = async (formValue: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formValue,
        { withCredentials: true }
      );
      const user = response.data.user;
      // console.log(user)
      if (user) {
        // Save the user to localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token); // Save token

        // You can also use cookies if needed
        // setCookie("token", user.token);

      // Update context
      dispatch({ type: "LOGIN", payload: user });

       // Check the user's role and navigate accordingly
       if (user.role === "host") {
        navigate("/dashboard"); // Navigate to the dashboard if host
      } else {
        navigate("/"); // Navigate to the homepage otherwise
      }
    }
      return true;
    } catch (error: any) {
      setError(error.response?.data?.error || "An error occurred");
      return false;
    }
  };

  return { login, isLoading, setIsLoading, error };
};

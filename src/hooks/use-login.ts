/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
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
      const companyName = response.data.companyName;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token); // Save token

      dispatch({ type: "LOGIN", payload: {...user, companyName} });

       if (user.role === "host") {
        navigate("/dashboard"); 
      } else {
        navigate("/"); 
      }
    }
      return false;
    } catch (error: any) {
      setError(error.response?.data?.error || "An error occurred");
      return false;
    }
  };

  return { login, isLoading, setIsLoading, error };
};

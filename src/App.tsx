// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Offices from "./pages/Offices";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
// import HostLoginPage from "./pages/Host-login";
import HostRegisterPage from "./pages/Host-register";
import { Dashboard } from "./pages/(user2)/Dashboard";
import { Bookings } from "./pages/(user2)/Bookings";
import { Spaces } from "./pages/(user2)/Spaces";
import { AddSpace } from "./pages/(user2)/(space)/AddSpace";
import { UpdateSpace } from "./pages/(user2)/(space)/EditSpace";
import { AuthContextProvider } from "./context/AuthContext";
import Layout from "./pages/(user2)/Layout";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Office from "./pages/Office";
import SearchPage from "./pages/Search";
import { Settings } from "./pages/(user2)/Settings";
import ResetPassword from "./pages/reset-password";
import ForgetPassword from "./pages/forget-password";
import PaystackCallback from "./pages/(user1)/VerifyPayment";
import Notfound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import ConferenceRoom from "./pages/ConferenceRooms";
import MeetingRooms from "./pages/MeetingRooms";
import CoworkingDesks from "./pages/Coworking";
import EventSpaces from "./pages/EventSpace";
import Pricing from "./components/Pricing";
import Features from "./pages/Features";
import FAQ from "./components/Faq";
import { CalculatorProvider } from "./context/CalcContext";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Simulate loading complete after 2 seconds
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <ClipLoader />
      </div>
    );
  }
  return (
    <>
      <AuthContextProvider>
        <CalculatorProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Notfound />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/offices" element={<Offices />} />
            <Route path="/conference-rooms" element={<ConferenceRoom />} />
            <Route path="/meeting-rooms" element={<MeetingRooms />} />
            <Route path="/coworking-desks" element={<CoworkingDesks />} />
            <Route path="/event-spaces" element={<EventSpaces />} />
            <Route path="/space/:id" element={<Office />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route
              path="/passwordreset/:resetToken"
              element={<ResetPassword />}
            />
            <Route
              path="/paystack/callback/verify-payment"
              element={<PaystackCallback />}
            />
            {/* <Route path="/host-login" element={<HostLoginPage />} /> */}
            <Route path="/host-register" element={<HostRegisterPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/faq" element={<FAQ />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/spaces" element={<Spaces />} />
              <Route path="/settings" element={<Settings />} />

              <Route path="/edit/:id" element={<UpdateSpace />} />
              <Route path="/add-space" element={<AddSpace />} />
            </Route>
          </Routes>
        </CalculatorProvider>
      </AuthContextProvider>
      <Toaster />
    </>
  );
}

export default App;

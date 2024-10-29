// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Offices from "./pages/Offices";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HostLoginPage from "./pages/Host-login";
import HostRegisterPage from "./pages/Host-register";
import { Dashboard } from "./pages/(user2)/Dashboard";
import { Bookings } from "./pages/(user2)/Bookings";
import { Spaces } from "./pages/(user2)/Spaces";
import { AddSpace } from "./pages/(user2)/(space)/AddSpace";
import { UpdateSpace } from "./pages/(user2)/(space)/EditSpace";
import { AuthContextProvider } from "./context/AuthContext";
import Layout from "./pages/(user2)/Layout";
import { useEffect, useState } from "react";
import { ClipLoader} from "react-spinners";
import Office from "./pages/Office";
import SearchPage from "./pages/Search";
import { Settings } from "./pages/(user2)/Settings";

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
        {/* //Customize your loading screen here */}
      </div>
    ); 
  }
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/offices" element={<Offices />} />
          <Route path="/space/:id" element={<Office />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/host-login" element={<HostLoginPage />} />
          <Route path="/host-register" element={<HostRegisterPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/spaces" element={<Spaces />} />
            <Route path="/settings" element={<Settings />} />
            
            <Route path="/user/space/edit/:id" element={<UpdateSpace />} />
            <Route path="/spaces/add-space" element={<AddSpace />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;

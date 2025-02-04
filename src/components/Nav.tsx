"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleUser, Menu, X } from "lucide-react";
import SearchSection from "./SearchSection";

const Nav = () => {
  const [userRole, setUserRole] = useState<string | null>(null); // Store user data
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if the user is logged in and get their role
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.role) {
      setUserRole(user.role); // Set the role from localStorage
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    localStorage.removeItem("token"); // Optionally remove token
    setUserRole(null); // Reset user state
    navigate("/"); // Redirect to homepage
  };

  return (
    <>
      <nav className="flex flex-col py-4 px-4 sm:px-20 bg-white border">
        <div className="flex justify-between items-center">
          <div className="logo">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/allospace-big-logo.png"
                alt=""
                width={140}
                height={40}
                className="p-0"
              />
              <p className="text-white font-medium text-sm">ALLOSPACE</p>
            </Link>
          </div>
          <div className="hidden lg:flex">
            <SearchSection className="w-96 py-3" />
          </div>
          <div className="hidden lg:flex auth  gap-2">
            {userRole === "host" ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <CircleUser className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                   
                      <Link to="/dashboard">
                       <DropdownMenuItem>
                            Dashboard
                      </DropdownMenuItem> 
                      </Link>
                   
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : userRole === "customer" ? (
              <>
                {/* <Button variant={"ghost"} onClick={handleLogout}>
                Logout
              </Button> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <CircleUser className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant={"primary"} className="border px-8 py-5">
                    Sign in
                  </Button>
                </Link>
                <Link to="/host-register">
                  <Button
                    variant={"secondary"}
                    className="border rounded px-8 py-5 bg-white"
                  >
                    List space
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 bg-transparent"
            >
              <span className="sr-only">Open main menu</span>
              <Menu aria-hidden="true" className="h-6 w-6 text-[#00593F]" />
            </button>
          </div>
        </div>
        <div className="lg:hidden flex justify-center my-3  ">
          <SearchSection className="w-[340px] sm:w-[400px] md:w-[600px] lg:w-[800px]" />
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src="/allospace-logo.png" alt="logo" width={70} />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/offices"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Offices
                </Link>
                <Link
                  to="/coworking-desks"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Coworking space
                </Link>
                <Link
                  to="/event-spaces"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Event spaces
                </Link>
                <Link
                  to="/conference-rooms"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Conference rooms
                </Link>
                <Link
                  to="/meeting-rooms"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Meeting rooms
                </Link>
              </div>
              <div className="py-6">
                {userRole === "host" ? (
                  <div>
                    <Link
                      to="dashboard"
                      className="-mx-3 mb-4 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <Button
                      onClick={handleLogout}
                      variant={"destructive"}
                      className="rounded-lg py-2.5 text-base/7 font-semibold"
                    >
                      Log out
                    </Button>
                  </div>
                ) : userRole === "customer" ? (
                  <Button
                    onClick={handleLogout}
                    variant={"destructive"}
                    className="rounded-lg py-2.5 text-base/7 font-semibold"
                  >
                    Log out
                  </Button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/host-register"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      List space
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default Nav;

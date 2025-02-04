import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  BookIcon,
  CircleUser,
  Home,
  Menu,
  Search,
  Settings2Icon,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { PersonIcon } from "@radix-ui/react-icons";

import React, { useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

const Layout: React.FC = () => {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const location = useLocation();
  const isActivePath = (path: string) => location.pathname === path;

  // Redirect to login if no user
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    // localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link to="/" className="flex items-center gap-2 font-semibold">
                <img src="/allospace-logo.png" alt="logo" width={50} height={50} />
                {/* <span className="">allospace</span> */}
                <span className="">{}</span>
              </Link>
              <Button variant="primary" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  to="/dashboard"
                 className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActivePath('/dashboard')
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground'
                  }`}
               >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/bookings"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActivePath('/bookings')
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  <PersonIcon className="h-4 w-4" />
                  Bookings
                  
                </Link>
                <Link
                  to="/spaces"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActivePath('/spaces')
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  <BookIcon className="h-4 w-4" />
                  Spaces
                  
                </Link>
                <Link
                  to="/settings"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActivePath('/settings')
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  <Settings2Icon/>
                  Settings
                  
                </Link>

                {/* <Link
                  to="/"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Users className="h-4 w-4" />
                  Spaces
                </Link> */}
                {/* <Link
                  to="/"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LineChart className="h-4 w-4" />
                  Analytics
                </Link> */}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                 
                  <Link to="/" className="flex items-center gap-2 font-semibold">
                <img src="/allospace-logo.png" alt="logo" width={50} height={50} />
                {/* <span className="">allospace</span> */}
                <span className="">{}</span>
              </Link>
                  <Link
                    to="/dashboard"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                    
                  </Link>
                  <Link
                    to="/bookings"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                  <PersonIcon className="h-4 w-4" />
                    
                    Bookings
                    
                  </Link>
                  <Link
                    to="/spaces"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Spaces
                   
                  </Link>
                  <Link
                  to="/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Settings2Icon/>
                  Settings
                  
                </Link>
                  {/* <Link
                    to="/"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Package className="h-5 w-5" />
                    Calender
                  </Link>
                  <Link
                    to="/"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Users className="h-5 w-5" />
                    Bookings
                  </Link>
                  <Link
                    to="/"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-5 w-5" />
                    Analytics
                  </Link> */}
                </nav>
                <div className="mt-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our
                        support team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant={"primary"} size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <Button variant={"primary"}>Upgrade</Button>
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
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {/* {children} */}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;

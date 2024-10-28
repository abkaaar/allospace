import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { CircleUser } from "lucide-react";

const Nav = () =>{
    const [userRole, setUserRole] = useState<string | null>(null); // Store user data
    const navigate = useNavigate();
  
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

    return(
        <>
       <nav className="flex justify-between py-4 px-4 sm:px-20 bg-[#00593F]">
        <div className="logo">
          <a href="/" className="text-white text-2xl font-medium">
            AlloSpace.co
          </a>
        </div>

        <div className="auth flex gap-2">
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
                <DropdownMenuItem>
                  <Link to="dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
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
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant={"primary"} className="border">Sign in</Button>
              </Link>
              <Link to="/host-register">
                <Button variant={"primary"} className="border rounded-e-3xl">
                  List space
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
        </>
    )
}

export default Nav;
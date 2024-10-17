import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

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
              <Link to="/dashboard">
                <Button variant={"ghost"}>Dashboard</Button>
              </Link>
            </>
          ) : userRole === "customer" ? (
            <>
              <Button variant={"ghost"} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant={"ghost"}>Sign in</Button>
              </Link>
              <Link to="/host-register">
                <Button variant={"ghost"} className="rounded-e-3xl">
                  Host Register
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
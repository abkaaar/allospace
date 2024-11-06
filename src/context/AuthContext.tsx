import React, {
  createContext,
  useEffect,
  ReactNode,
  useReducer,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  companyName: string;
  address: string;
}

interface AuthState {
  user: User | null;
}

interface AuthContextType extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case "LOGIN":
//       return { user: action.payload };
//     case "LOGOUT":
//       return { user: null };
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
//   children,
// }) => {
//   const [state, dispatch] = useReducer(authReducer, { user: null });
// const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem('user');
//     if (user && token ) {
//         const parsedUser = JSON.parse(user);
//         try{
//           // Decode the token to get expiration time
//         const decodedToken: { exp: number } = jwtDecode(token);
//         const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
//         const currentTime = Date.now();

//         // Check if token is expired
//         if (currentTime >= expirationTime) {
//           // Token expired, log out the user
//           dispatch({ type: "LOGOUT" });
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//         }else{
//            // Token is valid, log in the user
//            dispatch({type: 'LOGIN', payload: parsedUser});

//             // Set a timeout to log out the user when the token is about to expire
//           const timeoutId = setTimeout(() => {
//             dispatch({ type: "LOGOUT" });
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//           }, expirationTime - currentTime);

//           // Clear the timeout if the component unmounts
//           return () => clearTimeout(timeoutId);
//         }
//       }catch(error){
//         console.error("Token decoding failed:", error);
//       }

//       }
//       setLoading(false); // Ensure this runs after checking localStorage

//   }, []);

// if (loading) {
//   return <div>loading</div>; // Or a loading spinner
// }

//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (user && token) {

      const parsedUser = JSON.parse(user);
      try {
        // Decode the token to get expiration time
        const decodedToken: { exp: number } = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        setLoading(false); 


        // Check if token is expired
        if (currentTime >= expirationTime) {
          // Token expired, log out the user
          dispatch({ type: "LOGOUT" });
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        } else {
          // Token is valid, log in the user
          dispatch({ type: "LOGIN", payload: parsedUser });

          // Set a timeout to log out the user when the token is about to expire
          const timeoutId = setTimeout(() => {
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }, expirationTime - currentTime);

          // Return cleanup function to clear timeout on unmount
          return () => clearTimeout(timeoutId);
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }
  setLoading(false); 

  }, []); 

  if (loading) {
    return <div></div>; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

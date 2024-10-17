import React, {
  createContext,
  useEffect,
  ReactNode,
  useReducer,
  useState,
} from "react";

interface User {
  id: string;
  email: string;
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

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const user = localStorage.getItem('user');
    // if (user && token ) {
    if (user) {
        const parsedUser = JSON.parse(user);
        dispatch({type: 'LOGIN', payload: parsedUser});
      } 

      setLoading(false); // Mark loading as complete after checking storage

  }, []);

  // console.log('AuthContext state: ',state);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loader while checking auth
  }
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
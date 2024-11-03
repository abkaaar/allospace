import React, {
  createContext,
  useEffect,
  ReactNode,
  useReducer,
} from "react";

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

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const user = localStorage.getItem('user');
    // if (user && token ) {
    if (user) {
        const parsedUser = JSON.parse(user);
        dispatch({type: 'LOGIN', payload: parsedUser});
      } 


  }, []);

  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
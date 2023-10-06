"use client";
import { UserType } from "@/types";
import axios from "axios";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


export interface UserState {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}

const UserContext = createContext<UserState | null>(null);

const UserProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user && token) {
      (async () => {
        try {
          const response = await axios.get(`${process.env.BACKEND_URL}/users/individual`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          if(response.status === 200){
            setUser(response.data.user);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserProvider = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserProvider must be used within ContextWrapper");
  }

  return context;
};

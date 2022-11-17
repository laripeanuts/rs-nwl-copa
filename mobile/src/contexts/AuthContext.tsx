import { createContext } from "react";
import { User } from "../@types/User";

export interface AuthContextData {
  user: User;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider = ({ children }) => {
  const signOut = async () => {};

  const user: User = {
    name: "Larissa Rabelo",
    avatarUrl: "http://github.com/laripeanuts.png",
  };

  const signIn = async () => {
    console.log(user);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

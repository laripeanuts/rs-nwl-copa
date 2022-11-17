import { useContext } from "react";
import { AuthContext, AuthContextData } from "../contexts/AuthContext";

export const useAuthContext = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

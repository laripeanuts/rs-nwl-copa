import { useContext } from "react";
import { AuthContext, AuthContextDataProps } from "../contexts/AuthContext";

export const useAuthContext = (): AuthContextDataProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

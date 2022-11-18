import { createContext, useEffect, useState } from "react";
import { User } from "../@types/User";

import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export interface AuthContextData {
  user: User;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "167184063455-1cp7b64u9obddcs43i4h13f2k183uld8.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  const signIn = async () => {
    try {
      setIsUserLoading(true);

      await promptAsync();
    } catch (error) {
      console.log(error);
      throw new Error("Não foi possível autenticar");
    } finally {
      setIsUserLoading(false);
    }
  };

  const googleAuthentication = async (token) => {
    console.log(`googleAuthentication`, token);
  };

  const signOut = async () => {};

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      googleAuthentication(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{ user, isUserLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

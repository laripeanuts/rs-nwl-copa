import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";

import { AppRoutes } from "./app.routes";

import { useAuthContext } from "../hooks/useAuthContext";
import { SignIn } from "../screens/SignIn";

export function Routes() {
  const { user } = useAuthContext();

  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  );
}

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";

import { AuthContextProvider } from "./src/contexts/AuthContext";

import { Center, NativeBaseProvider, StatusBar } from "native-base";

import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import { THEME } from "./src/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <AuthContextProvider>
      <NativeBaseProvider theme={THEME}>
        <Center flex={1} bg="gray.900">
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          {fontsLoaded ? <Routes /> : <Loading />}
        </Center>
      </NativeBaseProvider>
    </AuthContextProvider>
  );
}

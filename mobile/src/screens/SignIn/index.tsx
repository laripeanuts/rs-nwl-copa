import { Center, Text } from "native-base";
import { useAuthContext } from "../../hooks/useAuthContext";

import Logo from "../../assets/logo.svg";
import { Button } from "../../components/Button";

export const SignIn = () => {
  const { signIn, isUserLoading } = useAuthContext();

  return (
    <Center flex={1} bg="gray.900" padding={7} w="full">
      <Logo width={212} height={40} />
      <Button
        icon="google"
        title="Entrar com Google"
        type="secondary"
        marginTop={10}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: "white" } }}
      />
      <Text color="gray.500" textAlign="center" marginTop={5}>
        Não utilizamos nenhuma informação {"\n"} além do seu e-mail
      </Text>
    </Center>
  );
};

import { Center, Text } from "native-base";

import Logo from "../../assets/logo.svg";
import { Button } from "../../components/Button";
import { useAuthContext } from "../../hooks/useAuthContext";

export const SignIn = () => {
  const { signIn } = useAuthContext();
  return (
    <Center flex={1} bg="gray.900" padding={7}>
      <Logo width={212} height={40} />
      <Button
        icon="google"
        title="Entrar com Google"
        type="secondary"
        marginTop={10}
        onPress={signIn}
      />
      <Text color="gray.500" textAlign="center" marginTop={5}>
        Não utilizamos nenhuma informação {"\n"} além do seu e-mail
      </Text>
    </Center>
  );
};

import { Center, Text } from "native-base";

import Logo from "../../assets/logo.svg";
import { Button } from "../../components/Button";

export const SignIn = () => {
  return (
    <Center flex={1} bg="gray.900" padding={7}>
      <Logo width={212} height={40} />
      <Button
        icon="google"
        title="Entrar com Google"
        type="secondary"
        marginTop={10}
      />
      <Text color="gray.500" textAlign="center" marginTop={5}>
        Não utilizamos nenhuma informação {"\n"} além do seu e-mail
      </Text>
    </Center>
  );
};

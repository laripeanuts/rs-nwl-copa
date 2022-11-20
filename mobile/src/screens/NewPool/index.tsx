import { Heading, Text, VStack } from "native-base";
import Logo from "../../assets/logo.svg";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

export const NewPool = () => {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Criar bolão" />
      <VStack flex={1} alignItems="center" my={8} mx={5}>
        <Logo />
        <Heading
          color="white"
          fontFamily="heading"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão e compartilhe entre amigos!
        </Heading>
        <Input placeholder="Qual o nome do seu bolão?" />
        <Button mt={3} title="Criar bolão" />
        <Text mt={5} px={5} fontSize="sm" color="gray.300" textAlign="center">
          Após criar seu bolão, você receberá um código único que poderá ser
          enviado para outras pessoas jogar com você!
        </Text>
      </VStack>
    </VStack>
  );
};

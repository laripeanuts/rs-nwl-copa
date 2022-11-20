import { Heading, VStack } from "native-base";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

export const FindPool = () => {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Procurar bolão" showBackButton />
      <VStack flex={1} alignItems="center" mb={8} mx={5}>
        <Heading
          color="white"
          fontFamily="heading"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Encontre o bolão através do código único!
        </Heading>
        <Input placeholder="Digite o código do bolão" />
        <Button mt={3} title="Buscar bolão" />
      </VStack>
    </VStack>
  );
};

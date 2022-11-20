import { VStack } from "native-base";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

export const Pools = () => {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Meus bolões" />
      <VStack
        margin={5}
        pb={5}
        borderBottomWidth={1}
        borderBottomColor={"gray.300"}
      >
        <Button title="Buscar bolão por código" icon="search" />
      </VStack>
    </VStack>
  );
};

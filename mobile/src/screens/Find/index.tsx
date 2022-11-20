import { useNavigation } from "@react-navigation/native";
import { Heading, VStack } from "native-base";

import { useState } from "react";
import { useNotification } from "../../contexts/useShowNotification";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { api } from "../../services/api";

export const Find = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const { navigate } = useNavigation();

  const { showSuccess, showError } = useNotification();

  const handleJoinPool = async () => {
    try {
      if (!code.trim()) {
        return showError("Informe o código!");
      }

      await api.post("/pools/join", { code });
      showSuccess("Você entrou no bolão com sucesso!");
      navigate("pools");
    } catch (error) {
      console.log(error);
      setIsLoading(true);

      const defaultMessage = "o Bolão não encontrado!";
      const messageDicionary: Record<string, string> = {
        "Pool not found": "Bolão não encontrado!",
        "You've already joined in this pool": "Você já está nesse bolão!",
      };

      const responseMessage = error.response?.data?.message;
      const errorMessage = messageDicionary[responseMessage] ?? defaultMessage;

      showError(errorMessage);
    }
  };

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
        <Input
          placeholder="Digite o código do bolão"
          autoCapitalize="characters"
          onChangeText={setCode}
          value={code}
        />
        <Button
          mt={3}
          uppercase
          title="Buscar bolão"
          onPress={handleJoinPool}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
};

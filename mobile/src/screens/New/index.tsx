import { Heading, Text, VStack } from "native-base";
import { useState } from "react";

import Logo from "../../assets/logo.svg";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { useNotification } from "../../contexts/useShowNotification";
import { api } from "../../services/api";

export const New = () => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { showSuccess, showError } = useNotification();

  const handlePoolCreate = async () => {
    if (!title.trim()) {
      return showError("Informe um nome para o seu bolão");
    }

    try {
      setIsLoading(true);

      await api.post("/pools", {
        title,
      });

      showSuccess("Bolão criado com sucesso!");

      setTitle("");
    } catch (error) {
      console.log(error);

      showError("Não foi possível criar o bolão");

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

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
        <Input
          placeholder="Qual o nome do seu bolão?"
          onChangeText={setTitle}
          value={title}
        />
        <Button
          mt={3}
          title="Criar bolão"
          uppercase
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />
        <Text mt={5} px={5} fontSize="sm" color="gray.300" textAlign="center">
          Após criar seu bolão, você receberá um código único que poderá ser
          enviado para outras pessoas jogar com você!
        </Text>
      </VStack>
    </VStack>
  );
};

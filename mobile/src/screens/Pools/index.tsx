import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, VStack } from "native-base";
import { useCallback, useState } from "react";

import { Button } from "../../components/Button";
import { EmptyPoolList } from "../../components/EmptyPoolList";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { PoolCard } from "../../components/PoolCard";
import { PoolData } from "../../components/PoolCard copy";

import { useNotification } from "../../contexts/useShowNotification";

import { api } from "../../services/api";

export const Pools = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pools, setPools] = useState<PoolData[]>([]);

  const { navigate } = useNavigation();

  const { showError } = useNotification();

  const fetchPools = async () => {
    try {
      setIsLoading(true);

      const response = await api.get("/pools");

      setPools(response.data.pools);
    } catch (error) {
      console.log(error);

      showError("Não foi possível carregar os bolões!");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, []),
  );

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Meus bolões" />
      <VStack
        margin={5}
        pb={5}
        borderBottomWidth={1}
        borderBottomColor={"gray.300"}
      >
        <Button
          title="Buscar bolão por código"
          icon="search"
          uppercase
          onPress={() => navigate("find")}
        />
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigate("details", { id: item.id })}
            />
          )}
          ListEmptyComponent={() => <EmptyPoolList />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          px={5}
        />
      )}
    </VStack>
  );
};

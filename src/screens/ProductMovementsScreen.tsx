import { SafeAreaView, StyleSheet } from "react-native";
import { ProductCellASimplified } from "../components/ProductCellSimplified";
import { Product } from "../models/Product";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import {
  RootNavigationProps,
  RootParamList,
} from "../navigation/RootStackNavigator";
import { commonStyles } from "../styles/commonStyles";
import { View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { FlatList } from "react-native";
import { HistoryCell } from "../components/HistoryCell";
import { useMemo } from "react";

type History = {
  quantityDelta: number;
  quantityAfterOperation: number;
};
const history: History[] = [
  { quantityDelta: 10, quantityAfterOperation: 20 },
  { quantityDelta: -5, quantityAfterOperation: 15 },
  { quantityDelta: 10, quantityAfterOperation: 25 },
  { quantityDelta: -6, quantityAfterOperation: 19 },
  { quantityDelta: 1, quantityAfterOperation: 20 },
  { quantityDelta: 0, quantityAfterOperation: 20 },
  { quantityDelta: -5, quantityAfterOperation: 15 },
  { quantityDelta: 10, quantityAfterOperation: 25 },
  { quantityDelta: -6, quantityAfterOperation: 19 },
  { quantityDelta: 1, quantityAfterOperation: 20 },
];

const ProductMovementsScreen = () => {
  const route = useRoute<RouteProp<RootParamList, "ProductMovementsScreen">>();
  const navigation = useNavigation<RootNavigationProps>();
  const { product } = route.params;
  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      // Filtra todos os items com a quantidade = 0
      if (item.quantityDelta === 0) {
        return false;
      }
      return true;
    });
  }, [history]);
  const handleProductPress = (product: Product) => {
    navigation.navigate("ProductDetailsScreen", { product });
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <View style={styles.container}>
        <ProductCellASimplified
          product={product}
          onPress={handleProductPress}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredHistory}
          renderItem={({ item }) => <HistoryCell history={item} />}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButton
            style={styles.registerEntryButtonStyle}
            text={"Registar Entrada"}
            onPress={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <PrimaryButton
            style={styles.registerExitButtonStyle}
            text={"Registar Saida"}
            onPress={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  registerEntryButtonStyle: {
    width: "auto",
  },
  registerExitButtonStyle: {
    width: "auto",
  },
  container: {
    ...commonStyles.container,
    justifyContent: "space-between",
    gap: 16,
  },
});

export { ProductMovementsScreen };
export type { History };

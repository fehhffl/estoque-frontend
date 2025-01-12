import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { ProductCell } from "../components/ProductCell";
import { Product } from "../models/Product";
import { getProducts } from "../services/api";
import { useCallback, useState } from "react";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { RootNavigationProps } from "../navigation/RootStackNavigator";

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigator = useNavigation<RootNavigationProps>();
  const isFocused = useIsFocused();

  async function loadData() {
    const { data } = await getProducts();
    setProducts(data);
  }

  // Recarrega os produtos toda vez que volta pra tela
  useFocusEffect(
    useCallback(() => {
      // impede que load data seja chamada multiplas vezes (view will appear do swift)
      if (isFocused) {
        loadData();
      }
    }, [isFocused])
  );

  const handleProductPress = (product: Product) => {
    navigator.navigate("ProductDetailsScreen", { product });
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          return <ProductCell product={item} onPress={handleProductPress} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: "white",
  },
});
export { ProductListScreen };

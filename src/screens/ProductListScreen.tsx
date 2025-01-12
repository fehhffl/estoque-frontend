import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { ProductCell } from "../components/ProductCell";
import { Product } from "../models/Product";
import { getProducts } from "../services/api";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps } from "../navigation/RootStackNavigator";

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigator = useNavigation<RootNavigationProps>();

  async function loadData() {
    const { data } = await getProducts();
    console.log(JSON.stringify(data, null, 2));
    setProducts(data);
  }

  useEffect(() => {
    loadData();
  }, []);

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

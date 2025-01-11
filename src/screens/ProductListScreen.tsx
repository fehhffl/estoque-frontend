import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { ProductCell } from "../components/ProductCell";
import { Product } from "../models/Product";
import { getProducts } from "../services/api";
import { useEffect, useState } from "react";

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  async function loadData() {
    const { data } = await getProducts();
    setProducts(data);
  }
  useEffect(() => {
    loadData();
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          return <ProductCell product={item} />;
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

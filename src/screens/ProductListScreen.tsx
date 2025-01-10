import { SafeAreaView, StyleSheet } from "react-native";
import { ProductCell } from "../components/ProductCell";

const ProductListScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ProductCell />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
  },
});
export { ProductListScreen };

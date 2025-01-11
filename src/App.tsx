import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ProductListScreen } from "./screens/ProductListScreen";
import { Register } from "./screens/Register";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ProductListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

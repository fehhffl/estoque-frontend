import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { RegisterScreen } from "./screens/RegisterScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <RegisterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

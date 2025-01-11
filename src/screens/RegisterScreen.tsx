import { SafeAreaView, StyleSheet, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { PrimaryButton } from "../components/PrimaryButton";

const RegisterScreen = () => {
  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <View style={styles.container}>
        <PrimaryButton text={"Registrar"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { RegisterScreen };

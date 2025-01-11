import { SafeAreaView, StyleSheet, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { PrimaryButton } from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps } from "../navigation/RootStackNavigator";

const RegisterScreen = () => {
  const navigator = useNavigation<RootNavigationProps>();

  const handleRegisterButtonPress = () => {
    navigator.navigate("ProductListScreen");
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <View style={styles.container}>
        <PrimaryButton text={"Registrar"} onPress={handleRegisterButtonPress} />
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

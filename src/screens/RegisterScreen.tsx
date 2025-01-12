import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { PrimaryButton } from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps } from "../navigation/RootStackNavigator";
import { register } from "../services/api";

const RegisterScreen = () => {
  const navigator = useNavigation<RootNavigationProps>();

  const handleRegisterButtonPress = () => {
    register("felipe", "fe.forioni@gmail.com", "banana123a");
    navigator.navigate("ProductListScreen");
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <KeyboardAvoidingView style={styles.container}>
        <PrimaryButton text={"Registrar"} onPress={handleRegisterButtonPress} />
      </KeyboardAvoidingView>
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

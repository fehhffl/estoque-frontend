import { SafeAreaView, StyleSheet } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { PrimaryButton } from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps } from "../navigation/RootStackNavigator";
import { register } from "../services/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const RegisterScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const handleRegisterButtonPress = () => {
    register("felipe", "fe.forioni@gmail.com", "banana123a");
    navigation.navigate("ProductListScreen");
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <PrimaryButton text={"Registrar"} onPress={handleRegisterButtonPress} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { RegisterScreen };

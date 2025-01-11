import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { commonStyles } from "../styles/commonStyles";
import { PrimaryButton } from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps } from "../navigation/RootStackNavigator";

const LoginScreen = () => {
  const [isSecured, setIsSecured] = useState(true);
  const navigator = useNavigation<RootNavigationProps>();

  const handleLoginButtonPress = () => {
    navigator.navigate("RegisterScreen");
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <KeyboardAvoidingView style={[commonStyles.container, { gap: 80 }]}>
        <View style={styles.topView}>
          <Text style={styles.tittleText}>Bem-Vindo</Text>
        </View>
        <View style={styles.centerView}>
          <TextInput style={styles.textInput} placeholder="E-mail" />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              secureTextEntry={isSecured}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setIsSecured((prev) => !prev)}
            >
              <MaterialIcons
                name={isSecured ? "visibility-off" : "visibility"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton text={"Entrar"} onPress={handleLoginButtonPress} />
          <PrimaryButton text={"Registrar"} onPress={handleLoginButtonPress} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topView: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  tittleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  centerView: {
    alignItems: "center",
    gap: 20,
  },
  textInput: {
    borderRadius: 12,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    height: 40,
    width: "100%",
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 40,
  },
  eyeButton: {
    marginLeft: 10,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
    alignItems: "center",
  },
});

export { LoginScreen };

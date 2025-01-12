import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { commonStyles } from "../styles/commonStyles";
import { PrimaryButton } from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps } from "../navigation/RootStackNavigator";
import { login } from "../services/api";
import { Alert } from "react-native";
import { isAxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = () => {
  const [isSecured, setIsSecured] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<RootNavigationProps>();

  const handleLoginButtonPress = async () => {
    // TODO: Validar email e senha
    try {
      await login(email, password);
      await AsyncStorage.setItem("login", email); // salva local o usuário logado, para que na proxima vez nao precisa logar dnv.

      // Navega sem a possibilidade de voltar para a tela de login
      navigation.reset({
        index: 0,
        routes: [{ name: "ProductListScreen" }],
      });
    } catch (error) {
      console.error(error);
      if (isAxiosError(error) && error.response?.status === 401) {
        Alert.alert("Erro", "Usuário ou senha incorretos.");
      } else {
        // qualquer outro erro que nao tem relação com usuário e senha incorretos
        Alert.alert("Erro", "Erro ao fazer login.");
      }
    }
  };

  const handleRegisterButtonPress = () => {
    navigation.navigate("RegisterScreen");
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.titleText}>Bem-Vindo</Text>
          <View style={styles.textInputsContainer}>
            <TextInput
              onChangeText={setEmail}
              style={styles.textInput}
              placeholder="E-mail"
              value={email}
              autoCapitalize={"none"}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.passwordInput}
                placeholder="Senha"
                secureTextEntry={isSecured}
              />
              <TouchableOpacity onPress={() => setIsSecured((prev) => !prev)}>
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
            <PrimaryButton
              text={"Registrar"}
              onPress={handleRegisterButtonPress}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
    alignItems: "center",
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  topView: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  textInputsContainer: {
    alignItems: "center",
    width: "100%",
    gap: 24,
  },
  textInput: {
    borderRadius: 12,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    height: 40,
    width: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
    alignItems: "center",
  },
});

export { LoginScreen };

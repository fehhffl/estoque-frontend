import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { PrimaryButton } from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps } from "../navigation/RootStackNavigator";
import { register } from "../services/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const RegisterScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordSecured, setIsPasswordSecured] = useState(true);
  const [isPasswordConfirmSecured, setIsPasswordConfirmSecured] =
    useState(true);
  const [error, setError] = useState(""); // Estado para mensagem de erro

  const handleRegisterButtonPress = async () => {
    if (!email || !password || !passwordConfirm) {
      setError("Todos os campos precisam estar preenchidos.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("As senhas não estão coincidindo.");
      return;
    }

    setError(""); 
    try {
      await register(username, email, password);
     navigation.navigate("LoginScreen");
    } catch(error) {
      console.error("Erro ao registrar usuario", error);
      Alert.alert("Erro", "Não foi possível registrar usuario.");
    }
    
    
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <KeyboardAwareScrollView
        style={[commonStyles.container]}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.InputFieldsView}>
          <Text style={styles.titleText}> Registro </Text>
          <TextInput
            onChangeText={setUsername}
            style={styles.textInput}
            placeholder="Nome de Usuário"
            value={username}
            autoCapitalize={"none"}
          />
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
              secureTextEntry={isPasswordSecured}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordSecured((prev) => !prev)}
            >
              <MaterialIcons
                name={isPasswordSecured ? "visibility-off" : "visibility"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              style={styles.passwordInput}
              placeholder="Confirmar Senha"
              secureTextEntry={isPasswordConfirmSecured}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordConfirmSecured((prev) => !prev)}
            >
              <MaterialIcons
                name={
                  isPasswordConfirmSecured ? "visibility-off" : "visibility"
                }
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <PrimaryButton
            text={"Registrar"}
            onPress={handleRegisterButtonPress}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  InputFieldsView: {
    padding: 24,
    gap: 24,
    flex: 1,
    top: -24,
    alignItems: "center",
    justifyContent: "center",
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: -10,
  },
});

export { RegisterScreen };

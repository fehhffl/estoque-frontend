import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Register = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.tittleText}>Bem-Vindo</Text>
        </View>
        <View style={styles.centerView}>
          <TextInput style={styles.TextInput} placeholder="User"></TextInput>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            secureTextEntry
          ></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.borderButton}>
            <Text style={styles.borderButtonText}>Logar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.borderButton}>
            <Text style={styles.borderButtonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 80,
  },
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
  TextInput: {
    borderRadius: 12,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    height: 40,
    width: "100%",
    marginBottom: 15,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  borderButton: {
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 15,
  },
  borderButtonText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { Register };

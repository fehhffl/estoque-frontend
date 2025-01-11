import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

const Register = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.welcomeText}> Bem-Vindo</Text>
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
  },
  topView: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 30,
  },
});

export { Register };

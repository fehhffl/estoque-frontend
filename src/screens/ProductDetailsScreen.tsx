import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TextInput,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";

const ProductDetailsScreen = () => {
  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <KeyboardAvoidingView style={styles.container}>
        <Image style={styles.imageStyle} />
        <TextInput style={styles.textInputStyle} />
        <TextInput style={styles.textInputStyle} />
        <Text style={styles.staticText}></Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  imageStyle: {},
  textInputStyle: {},
  staticText: {},
});

export { ProductDetailsScreen };

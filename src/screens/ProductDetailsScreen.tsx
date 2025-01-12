import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootParamList } from "../navigation/RootStackNavigator";
import { useState } from "react";
import { PrimaryButton } from "../components/PrimaryButton";
import { MaterialIcons } from "@expo/vector-icons";

const ProductDetailsScreen = () => {
  const route = useRoute<RouteProp<RootParamList, "ProductDetailsScreen">>();
  const { product } = route.params;
  const [tittle, setTittle] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.imageBlob);

  const handleDeleteButtonPress = () => {};

  const handleSaveButtonPress = () => {};

  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.sectionStyle}>
          <Image style={styles.imageStyle} source={{ uri: image }} />
          <View style={styles.textInputContainerStyle}>
            <TextInput
              style={styles.tittleTextInputStyle}
              value={tittle}
              onChangeText={setTittle}
              placeholder="Nome do Produto"
            />
            <MaterialIcons name={"edit"} size={24} color="gray" />
          </View>
          <View style={styles.textInputContainerStyle}>
            <TextInput
              style={styles.textInputStyle}
              value={description}
              onChangeText={setDescription}
              placeholder="Descriçao do Produto"
            />
            <MaterialIcons name={"edit"} size={16} color="gray" />
          </View>

          <Text style={styles.staticText}>Quantidade: {product.quantity}</Text>
        </View>
        <View style={styles.sectionStyle}>
          <PrimaryButton text={"Salvar"} onPress={handleSaveButtonPress} />
          <PrimaryButton
            text={"Deletar"}
            onPress={handleDeleteButtonPress}
            style={{ backgroundColor: "#ffbbbb", borderWidth: 0 }}
            textStyle={{ color: "white" }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionStyle: {
    width: "100%",
    alignItems: "center",
    gap: 8,
  },
  textInputContainerStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageStyle: {
    width: "100%",
    backgroundColor: "grey",
    height: 300,
    borderRadius: 4,
  },
  textInputStyle: {
    borderColor: "gray",
    paddingVertical: 4,
    fontSize: 15,
  },
  staticText: {
    width: "100%",
    fontSize: 15,
  },
  tittleTextInputStyle: {
    borderColor: "gray",
    paddingVertical: 4,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export { ProductDetailsScreen };

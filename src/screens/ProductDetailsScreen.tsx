import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootParamList } from "../navigation/RootStackNavigator";
import { useState } from "react";
import { PrimaryButton } from "../components/PrimaryButton";
import { MaterialIcons } from "@expo/vector-icons";
import { pickImage } from "../services/imageService";
import { updateProduct } from "../services/api";

const ProductDetailsScreen = () => {
  const route = useRoute<RouteProp<RootParamList, "ProductDetailsScreen">>();
  const { product } = route.params;
  const [title, setTitle] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [pickedImageUri, setPickedImageUri] = useState<string | null>(
    product.image
  );
  const [uploadedProductId, setUploadedProductId] = useState<number | null>(
    null
  );
  const [downloadedImageUri, setDownloadedImageUri] = useState<string | null>(
    null
  );

  const handleDeleteButtonPress = () => {};

  const handleSaveButtonPress = async () => {
    const updatedProduct = {
      id: product.id,
      name: title,
      description,
      image: pickedImageUri,
      quantity: product.quantity,
    };
    try {
      await updateProduct(updatedProduct);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao atualizar o produto.");
    }
  };

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setPickedImageUri(uri);
    }
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.sectionStyle}>
          <TouchableOpacity onPress={handlePickImage} style={styles.imageStyle}>
            <Image
              style={styles.imageStyle}
              source={{ uri: pickedImageUri ?? "" }}
            />
          </TouchableOpacity>
          <View style={styles.textInputContainerStyle}>
            <TextInput
              style={styles.titleTextInputStyle}
              value={title}
              onChangeText={setTitle}
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
  titleTextInputStyle: {
    borderColor: "gray",
    paddingVertical: 4,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export { ProductDetailsScreen };

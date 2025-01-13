import {
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
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  RootNavigationProps,
  RootParamList,
} from "../navigation/RootStackNavigator";
import { useRef, useState } from "react";
import { PrimaryButton } from "../components/PrimaryButton";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { updateProductImage, updateProductInfo } from "../services/api";
import { EXPO_BASE_URL } from "@env";
import { isAxiosError } from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { deleteProduct } from "../services/api";

const ProductDetailsScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const route = useRoute<RouteProp<RootParamList, "ProductDetailsScreen">>();
  const { product } = route.params;
  const [imageBase64FromImgPicker, setImageBase64FromImgPicker] = useState<
    string | null
  >(null); // Quando a imagem foi escolhida do dispositivo
  const [productName, setProductName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const hasChangedImage = useRef(false);
  const productNameInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const handlePickImage = async () => {
    try {
      // Pede permissão para acessar galeria
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        base64: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Pega a base64 pura da imagem
        const base64String = result.assets[0].base64;
        setImageBase64FromImgPicker(base64String || null);
        hasChangedImage.current = true;
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

   const handleDeleteProduct = async (productId: string) => {
     try {
      // Deleta o produto no backend.
     await deleteProduct(product.id);
     Alert.alert("Produto deletado", "O produto foi removido com sucesso.");
     } catch(error) {
      console.error(error)
       Alert.alert("Erro", "Erro ao deletar produto.");
     } 
   };

   const confirmDeleteProduct = () => {
     Alert.alert(
       "Confirmar Exclusão",
       "Tem certeza de que deseja deletar este produto?",
       [
         { text: "Cancelar", style: "cancel" }, 
         {
           text: "Deletar",
           style: "destructive", 
           onPress: () => handleDeleteProduct(product.id), 
         },
       ],
       { cancelable: true }
     );
   };

  const handleSaveButtonPress = async () => {
    try {
      // Atualiza a imagem primeiro, caso tenha sido alterada,
      // para que se der erro, não atualiza as informações do produto ainda
      if (hasChangedImage.current && imageBase64FromImgPicker) {
        await updateProductImage(product.id, imageBase64FromImgPicker);
      }

      await updateProductInfo({
        id: product.id,
        name: productName,
        description,
        value: product.value,
        quantity: product.quantity,
      });

      Alert.alert("Produto atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error(error);

      if (isAxiosError(error) && error.response?.status === 413) {
        // 413 = Dados enviados muito grandes
        Alert.alert(
          "Erro",
          "Imagem muito grande. Por favor, escolha uma menor (10 MB max)."
        );
        return;
      }

      Alert.alert("Erro", "Erro ao atualizar produto.");
    }
  };

  const focusProductNameInput = () => {
    productNameInputRef.current?.focus();
  };

  const focusDescriptionInput = () => {
    descriptionInputRef.current?.focus();
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContentContainerStyle}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.sectionStyle}>
          {/* Imagem */}
          <TouchableOpacity
            onPress={handlePickImage}
            style={styles.imageContainerButtonStyle}
          >
            {/* Se o usuário escolher da galeria, mostramos a base64 local; caso contrário, mostramos a do servidor. */}
            {imageBase64FromImgPicker ? (
              <Image
                style={styles.imageStyle}
                source={{
                  uri: `data:image/jpeg;base64,${imageBase64FromImgPicker}`,
                }}
              />
            ) : (
              <Image
                style={styles.imageStyle}
                source={{
                  uri: `${EXPO_BASE_URL}/products/${product.id}/image`,
                }}
              />
            )}
          </TouchableOpacity>

          {/* Nome do produto */}
          <TouchableOpacity
            style={styles.textInputContainerStyle}
            onPress={focusProductNameInput}
          >
            <TextInput
              ref={productNameInputRef}
              style={styles.productNameInputStyle}
              value={productName}
              onChangeText={setProductName}
              placeholder="Nome do Produto"
            />
            <MaterialIcons name={"edit"} size={24} color="gray" />
          </TouchableOpacity>

          {/* Descrição */}
          <TouchableOpacity
            style={styles.textInputContainerStyle}
            onPress={focusDescriptionInput}
          >
            <TextInput
              ref={descriptionInputRef}
              style={styles.textInputStyle}
              value={description}
              onChangeText={setDescription}
              placeholder="Descrição do Produto"
              multiline
            />
            <MaterialIcons name={"edit"} size={16} color="gray" />
          </TouchableOpacity>

          {/* Valor */}

          {/* Quantidade */}
          <Text style={styles.staticText}>Quantidade: {product.quantity}</Text>
        </View>
        <View style={styles.sectionStyle}>
          <PrimaryButton text={"Salvar"} onPress={handleSaveButtonPress} />
          <PrimaryButton
            text={"Deletar"}
            onPress={confirmDeleteProduct}
            style={styles.deleteButtonStyle}
            textStyle={styles.deleteButtonTextStyle}
          />
        </View>
      </KeyboardAwareScrollView>
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
  scrollViewContentContainerStyle: {
    flexGrow: 1,
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
  imageContainerButtonStyle: {
    width: "100%",
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
  productNameInputStyle: {
    borderColor: "gray",
    paddingVertical: 4,
    fontSize: 25,
    fontWeight: "bold",
  },
  deleteButtonStyle: {
    backgroundColor: "#ffbbbb",
    borderWidth: 0,
  },
  deleteButtonTextStyle: {
    color: "white",
  },
});

export { ProductDetailsScreen };

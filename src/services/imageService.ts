import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

// Escolher uma imagem da galeria
export async function pickImage(): Promise<string | null> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Precisamos da permissão para acessar a galeria!");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    base64: false,
    allowsEditing: false,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    return result.assets[0].uri;
  }

  return null;
}

// Fazer upload da imagem escolhida
export async function uploadImage(uri: string): Promise<number | null> {
  const formData = new FormData();
  formData.append("image", {
    uri,
    name: "minhaFoto.jpg",
    type: "image/jpeg",
  } as any);

  try {
    const response = await fetch("http://10.0.2.2:3000/upload", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      Alert.alert("Erro no upload");
      return null;
    }

    const data = await response.json();
    return data.productId;
  } catch (err) {
    console.error(err);
    Alert.alert("Erro na comunicação com o servidor.");
    return null;
  }
}

// Baixar a imagem binária do servidor e converter para base64
export async function downloadImage(productId: number): Promise<string | null> {
  try {
    const response = await fetch(`http://10.0.2.2:3000/${productId}`);
    if (!response.ok) {
      Alert.alert("Erro ao buscar a imagem do servidor");
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuffer);
    return `data:image/jpeg;base64,${base64}`;
  } catch (err) {
    console.error(err);
    Alert.alert("Erro ao baixar/converter a imagem.");
    return null;
  }
}

// Função auxiliar para converter ArrayBuffer -> base64
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return Buffer.from(buffer).toString("base64");
}

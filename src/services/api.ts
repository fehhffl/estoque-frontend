import axios from "axios";
import * as FileSystem from "expo-file-system";
import { EXPO_BASE_URL } from "@env";
import { Product } from "../models/Product";

console.log(EXPO_BASE_URL);

const api = axios.create({
  baseURL: EXPO_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const register = (username: string, email: string, password: string) => {
  const body = { username, email, password };
  return api.post("/register", JSON.stringify(body));
};

const login = (email: string, password: string) => {
  const body = { email, password };
  return api.post("/login", JSON.stringify(body));
};

const getProducts = () => {
  return api.get("/products");
};

const deleteProduct = (productId: string) => {
  return api.delete(`/products/${productId}`);
};

const updateProductInfo = (product: Product) => {
  const body = product;
  return api.put(`/products/${product.id}`, JSON.stringify(body));
};

// retorna o product id do produto inserido.
const createProduct = async (
  name: string,
  description: string,
  value: number,
  quantity: number
): Promise<number> => {
  const body = { name, description, value, quantity };
  const response = await api.post("/products/create", JSON.stringify(body));
  console.log(response);
  return response.data?.productId;
};

const updateProductImage = (productId: string, image: string) => {
  const body = { image };
  return api.put(`/products/${productId}/image`, JSON.stringify(body));
};

const getProductImage = async (productId: string) => {
  const fileUri = `${FileSystem.cacheDirectory}${productId}.jpg`;

  // Verifica se o arquivo já foi baixado
  const fileInfo = await FileSystem.getInfoAsync(fileUri);

  if (fileInfo.exists) {
    return fileUri; // Retorna o caminho local se o arquivo já existe
  }

  // Faz o download da imagem do servidor
  const response = await FileSystem.downloadAsync(
    `${EXPO_BASE_URL}/products/${productId}/image`,
    fileUri
  );

  return response.uri;
};

export {
  login,
  register,
  getProducts,
  updateProductInfo,
  updateProductImage,
  getProductImage,
  deleteProduct,
  createProduct,
};

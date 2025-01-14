import axios from "axios";
import { EXPO_BASE_URL } from "@env";
import { Product } from "../models/Product";

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
  return response.data?.productId;
};

const updateProductImage = (productId: string, image: string) => {
  const body = { image };
  return api.put(`/products/${productId}/image`, JSON.stringify(body));
};

export {
  login,
  register,
  getProducts,
  updateProductInfo,
  updateProductImage,
  deleteProduct,
  createProduct,
};

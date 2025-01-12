import axios from "axios";
import { EXPO_BASE_URL } from "@env";
import { Product } from "../models/Product";

const api = axios.create({
  baseURL: EXPO_BASE_URL, // lembrar de colocar local host dps
  headers: { "Content-Type": "application/json" },
});

const register = (username: string, email: string, password: string) => {
  const body = { username, email, password }; // username: username...
  return api.post("/register", JSON.stringify(body)); // como medida de segurança eu poderia encripitar a senha no frontend antes de mandar para o backend
};

const login = (email: string, password: string) => {
  const body = { email, password };
  return api.post("/login", JSON.stringify(body));
};

const getProducts = () => {
  return api.get("/products");
};

const updateProduct = (product: Product) => {
  const body = product;
  return api.put("/product/update/" + product.id, JSON.stringify(body));
};

export { register, getProducts, login, updateProduct };

import axios from "axios";
import { EXPO_BASE_URL } from "@env";

const api = axios.create({
  baseURL: EXPO_BASE_URL, // lembrar de colocar local host dps
  headers: { "Content-Type": "application/json" },
});

export const getProducts = () => {
  return api.get("/products");
};

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  useAnimatedHeaderHeight,
} from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ProductListScreen } from "../screens/ProductListScreen";
import { ProductDetailsScreen } from "../screens/ProductDetailsScreen";
import { Product } from "../models/Product";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp } from "@react-navigation/native";

type RootParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProductListScreen: undefined;
  ProductDetailsScreen: { product: Product };
};

type RootNavigationProps = NativeStackNavigationProp<
  RootParamList,
  keyof RootParamList
>;

const defaultScreenOptions = {
  headerTitle: "",
  headerBackTitle: "‎", // fake space character
  headerTintColor: "black",
};

const Stack = createNativeStackNavigator<RootParamList>();

const RootStackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Verifica no armazenamento local, se tem algum usuario logado.
  // Caso houver carrega a tela de ProductList, se nao, Login.
  useEffect(() => {
    const result = AsyncStorage.getItem("login");
    if (result !== null) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? "ProductListScreen" : "LoginScreen"}
    >
      <Stack.Screen
        name={"LoginScreen"}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"RegisterScreen"}
        component={RegisterScreen}
        options={defaultScreenOptions}
      />
      <Stack.Screen
        name={"ProductListScreen"}
        component={ProductListScreen}
        options={defaultScreenOptions}
      />
      <Stack.Screen
        name={"ProductDetailsScreen"}
        component={ProductDetailsScreen}
        options={defaultScreenOptions}
      />
    </Stack.Navigator>
  );
};

export { RootStackNavigator };
export type { RootParamList, RootNavigationProps };

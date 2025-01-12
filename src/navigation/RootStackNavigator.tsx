import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ProductListScreen } from "../screens/ProductListScreen";
import { ProductDetailsScreen } from "../screens/ProductDetailsScreen";
import { Product } from "../models/Product";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerTitle: "",
  headerBackButtonDisplayMode: "minimal", // Remove o texto de voltar
  headerTintColor: "black",
};

const Stack = createNativeStackNavigator<RootParamList>();

const RootStackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const navigation = useNavigation<RootNavigationProps>();

  // Verifica no armazenamento local, se tem algum usuário logado.
  // Caso houver carrega a tela de ProductList, se nao, Login.
  const checkLogin = async () => {
    const result = await AsyncStorage.getItem("login");

    if (result !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("login");
    setIsLoggedIn(false);

    // Navega sem a possibilidade de voltar para a tela anterior
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };

  if (isLoggedIn === undefined) {
    return null;
  }

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
        options={{
          ...defaultScreenOptions,
          headerTitle: "Produtos",
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout}>
              <Text>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={"ProductDetailsScreen"}
        component={ProductDetailsScreen}
        options={{
          ...defaultScreenOptions,
          headerTitle: "Detalhes do Produto",
        }}
      />
    </Stack.Navigator>
  );
};

export { RootStackNavigator };
export type { RootParamList, RootNavigationProps };

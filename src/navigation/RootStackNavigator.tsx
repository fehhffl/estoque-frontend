import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ProductListScreen } from "../screens/ProductListScreen";

type RootParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProductListScreen: undefined;
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
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export { RootStackNavigator };
export type { RootParamList, RootNavigationProps };

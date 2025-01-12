import { FlatList, SafeAreaView } from "react-native";
import { ProductCell } from "../components/ProductCell";
import { Product } from "../models/Product";
import { getProducts } from "../services/api";
import { useCallback, useState } from "react";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { RootNavigationProps } from "../navigation/RootStackNavigator";
import { commonStyles } from "../styles/commonStyles";

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation<RootNavigationProps>();
  const isFocused = useIsFocused();

  async function loadData() {
    const { data } = await getProducts();
    setProducts(data);
  }

  // Recarrega os produtos toda vez que volta pra tela
  useFocusEffect(
    // impede que load data seja chamada múltiplas vezes (view will appear do swift)
    useCallback(() => {
      if (isFocused) {
        loadData();
      }
    }, [isFocused])
  );

  const handleProductPress = (product: Product) => {
    navigation.navigate("ProductDetailsScreen", { product });
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          return <ProductCell product={item} onPress={handleProductPress} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export { ProductListScreen };

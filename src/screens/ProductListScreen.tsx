import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
} from "react-native";
import { ProductCell } from "../components/ProductCell";
import { Product } from "../models/Product";
import { getProducts } from "../services/api";
import { useCallback, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { RootNavigationProps } from "../navigation/RootStackNavigator";
import { commonStyles } from "../styles/commonStyles";
import { ProductDetailsScreen } from "./ProductDetailsScreen";

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation<RootNavigationProps>();
  const isFocused = useIsFocused();
  const [isModalVisible, setIsModalVisible] = useState(false);

  async function loadData() {
    const { data } = await getProducts();
    setProducts(data);
  }

  const dismissModal = () => {
    setIsModalVisible(false);
  };

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
    navigation.navigate("ProductMovementsScreen", { product });
  };

  const handleAddProductButtonPress = () => {
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={({ item }) => {
            return <ProductCell product={item} onPress={handleProductPress} />;
          }}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleAddProductButtonPress}
        >
          <MaterialIcons name={"add"} size={24} color={"gray"} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={dismissModal}
      >
        <ProductDetailsScreen
          onCloseRequested={() => {
            dismissModal();
            loadData();
          }}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 24,
    bottom: 24,
    backgroundColor: "white",
  },
  container: {
    position: "relative",
  },
});

export { ProductListScreen };

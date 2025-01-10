import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { ProductCell } from "../components/ProductCell";
import { Product } from "../models/Product";

const products: Product[] = [
  {
    id: "0",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg",
    name: "Camiseta 0",
    description:
      "Descrição: Camiseta básica de algodão, confortável e leve, perfeita para o dia a dia.",
    quantity: 8,
  },
  {
    id: "1",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg",
    name: "Camiseta 1",
    description:
      "Descrição: Camiseta básica de algodão, confortável e leve, perfeita para o dia a dia.",
    quantity: 8,
  },
  {
    id: "2",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg",
    name: "Camiseta 2",
    description:
      "Descrição: Camiseta básica de algodão, confortável e leve, perfeita para o dia a dia.",
    quantity: 8,
  },
  {
    id: "3",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg",
    name: "Camiseta 3",
    description:
      "Descrição: Camiseta básica de algodão, confortável e leve, perfeita para o dia a dia.",
    quantity: 8,
  },
];

const ProductListScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          return <ProductCell product={item} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
  },
});
export { ProductListScreen };

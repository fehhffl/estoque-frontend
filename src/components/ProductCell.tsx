import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Product } from "../models/Product";
import { EXPO_BASE_URL } from "@env";

type ProductCellProps = {
  product: Product;
  onPress: (product: Product) => void;
};

const ProductCell = ({ product, onPress }: ProductCellProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(product);
      }}
      style={styles.container}
    >
      <Image
        style={styles.imageStyle}
        source={{
          uri: `${EXPO_BASE_URL}/products/${
            product.id
          }/image?data_carregada=${Date.now()}`,
        }} // Como data_carregada muda toda vez, isso força a imagem a ser recarregada quando o usuário volta pra tela
      />
      <View style={styles.textContainer}>
        <Text>{product.name} </Text>
        <Text>{product.description}</Text>
        <Text>{product.quantity}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 8,
  },
  container: {
    flexDirection: "row",
    padding: 24,
    gap: 8,
    width: "100%",
  },
  textContainer: {
    gap: 8,
  },
});

export { ProductCell };

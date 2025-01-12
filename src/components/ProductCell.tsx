import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Product } from "../models/Product";

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
          uri: product.imageBlob,
        }}
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
  },
  container: {
    flexDirection: "row",
    padding: 24,
    gap: 8,
  },
  textContainer: {
    gap: 8,
  },
});

export { ProductCell };

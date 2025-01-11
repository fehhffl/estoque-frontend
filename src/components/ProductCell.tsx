import { View, Image, StyleSheet, Text } from "react-native";
import { Product } from "../models/Product";

type ProductCellProps = {
  product: Product;
};

const ProductCell = (props: ProductCellProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={{
          uri: props.product.imageBlob,
        }}
      />
      <View style={styles.textContainer}>
        <Text>{props.product.name} </Text>
        <Text>{props.product.description}</Text>
        <Text>{props.product.quantity}</Text>
      </View>
    </View>
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

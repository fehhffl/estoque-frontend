import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Product } from "../models/Product";
import { EXPO_BASE_URL } from "@env";
import { MaterialIcons } from "@expo/vector-icons";

type ProductCellASimplifiedProps = {
  product: Product;
  onPress: (product: Product) => void;
  currentQuantity: number;
};

const ProductCellASimplified = ({
  product,
  onPress,
  currentQuantity,
}: ProductCellASimplifiedProps) => {

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(product);
      }}
      style={styles.container}
    >
      <View style={styles.contentView}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: `${EXPO_BASE_URL}/products/${
              product.id
            }/image?data_carregada=${Date.now()}`,
          }} // Como data_carregada muda toda vez, isso força a imagem a ser recarregada quando o usuário volta pra tela
        />
        <View style={styles.textContainer}>
          <Text style={styles.tittleText}>{product.name} </Text>
          <Text>Estoque Atual: {currentQuantity}</Text>
        </View>
      </View>
      <View>
        <MaterialIcons
          name={"edit"}
          size={16}
          color="gray"
          style={styles.editIconStyle}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editIconStyle: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 2,
  },
  contentView: {
    flexDirection: "row",
    gap: 8,
  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 8,
  },
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 16,
  },
  textContainer: {
    gap: 8,
  },
  tittleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { ProductCellASimplified };

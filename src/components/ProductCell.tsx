import { View, Image, StyleSheet, Text } from "react-native";

const ProductCell = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg",
        }}
      />
      <View style={styles.textContainer}>
        <Text>Camiseta </Text>
        <Text>
          {
            "Descrição: Camiseta básica de algodão, confortável e leve, perfeita para o dia a dia."
          }
        </Text>
        <Text>Quantidade: 8 </Text>
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

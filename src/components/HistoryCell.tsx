import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { History } from "../screens/ProductMovementsScreen";

import { MaterialIcons } from "@expo/vector-icons";

type HistoryCellProps = {
  history: History;
};

const HistoryCell = ({ history }: HistoryCellProps) => {
  const { width: screenWidth } = Dimensions.get("window");;

  return (
    <TouchableOpacity style={[styles.container, { width: screenWidth - 48 }]}>
      <View style={styles.contentView}>
        <MaterialIcons
          name={history.quantityDelta > 0 ? "arrow-upward" : "arrow-downward"}
          size={24}
        ></MaterialIcons>
        <View style={styles.textContainer}>
          <Text style={styles.tittleText}>
            {history.quantityDelta > 0 ? "Entrada: " : "Saída: "}
            {history.quantityDelta}
          </Text>
        </View>
      </View>
      <Text>Estoque Atual: {history.quantityAfterOperation}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
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
    alignItems: "center",
    marginBottom: 16,
  },
  textContainer: {
    gap: 8,
  },
  tittleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { HistoryCell };

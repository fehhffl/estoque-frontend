import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Alert,
} from "react-native";
import { ProductCellASimplified } from "../components/ProductCellSimplified";
import { Product } from "../models/Product";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import {
  RootNavigationProps,
  RootParamList,
} from "../navigation/RootStackNavigator";
import { commonStyles } from "../styles/commonStyles";
import { View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { FlatList } from "react-native";
import { HistoryCell } from "../components/HistoryCell";
import { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type History = {
  quantityDelta: number;
  quantityAfterOperation: number;
};
const history: History[] = [
  { quantityDelta: 10, quantityAfterOperation: 20 },
  { quantityDelta: -5, quantityAfterOperation: 15 },
  { quantityDelta: 10, quantityAfterOperation: 25 },
  { quantityDelta: -6, quantityAfterOperation: 19 },
  { quantityDelta: 1, quantityAfterOperation: 20 },
  { quantityDelta: 0, quantityAfterOperation: 20 },
  { quantityDelta: -5, quantityAfterOperation: 15 },
  { quantityDelta: 10, quantityAfterOperation: 25 },
  { quantityDelta: -6, quantityAfterOperation: 19 },
  { quantityDelta: 1, quantityAfterOperation: 20 },
];

const ProductMovementsScreen = () => {
  const route = useRoute<RouteProp<RootParamList, "ProductMovementsScreen">>();
  const navigation = useNavigation<RootNavigationProps>();
  const { product } = route.params;
  const [history, setHistory] = useState<History[]>([]);
  const [currentQuantity, setCurrentQuantity] = useState<number>(
    product.quantity || 0
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"entry" | "exit">("entry");
  const [inputQuantity, setInputQuantity] = useState<string>("");

  // Load history from AsyncStorage
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem(
          `history_${product.id}`
        );
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    };

    loadHistory();
  }, [product.id]);

  // Save history to AsyncStorage
  const saveHistory = async (newHistory: History[]) => {
    try {
      await AsyncStorage.setItem(
        `history_${product.id}`,
        JSON.stringify(newHistory)
      );
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  };

  const handleRegister = () => {
    const delta =
      modalType === "entry"
        ? parseInt(inputQuantity)
        : -parseInt(inputQuantity);

    if (currentQuantity + delta < 0) {
      Alert.alert(
        "Erro",
        "Você não pode registrar uma saída maior que seu estoque."
      );
      
      return;
    }
    
    if (isNaN(delta)) {
      return; // Ignore invalid input
    }

    const updatedQuantity = currentQuantity + delta;

    const newEntry: History = {
      quantityDelta: delta,
      quantityAfterOperation: updatedQuantity,
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    setCurrentQuantity(updatedQuantity);
    saveHistory(updatedHistory);

    setInputQuantity("");
    setModalVisible(false);
  };

  const openModal = (type: "entry" | "exit") => {
    setModalType(type);
    setModalVisible(true);
  };

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      // Filtra todos os items com a quantidade = 0
      if (item.quantityDelta === 0) {
        return false;
      }
      return true;
    });
  }, [history]);

  const handleProductPress = (product: Product) => {
    navigation.navigate("ProductDetailsScreen", { product });
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaStyle}>
      <View style={styles.container}>
        <ProductCellASimplified
          product={product}
          onPress={handleProductPress}
          currentQuantity={currentQuantity}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredHistory}
          renderItem={({ item }) => <HistoryCell history={item} />}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButton
            style={styles.registerEntryButtonStyle}
            text={"Registar Entrada"}
            onPress={() => {
              openModal("entry");
            }}
          />
          <PrimaryButton
            style={styles.registerExitButtonStyle}
            text={"Registar Saida"}
            onPress={() => {
              openModal("exit");
            }}
          />
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalType === "entry" ? "Registrar Entrada" : "Registrar Saída"}
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Digite a quantidade"
              value={inputQuantity}
              onChangeText={setInputQuantity}
            />
            <View style={styles.modalButtonContainer}>
              <PrimaryButton
                text="Confirmar"
                style={{ width: "auto" }}
                onPress={handleRegister}
              ></PrimaryButton>
              <PrimaryButton
                text="Cancelar"
                style={{ width: "auto" }}
                onPress={() => setModalVisible(false)}
              ></PrimaryButton>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  registerEntryButtonStyle: {
    width: "auto",
  },
  registerExitButtonStyle: {
    width: "auto",
  },
  container: {
    ...commonStyles.container,
    justifyContent: "space-between",
    gap: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    width: "100%",
    marginBottom: 16,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },

  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export { ProductMovementsScreen };
export type { History };

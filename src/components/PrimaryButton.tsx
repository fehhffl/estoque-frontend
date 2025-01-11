import { TouchableOpacity, Text, StyleSheet } from "react-native";

type PrimaryButtonsProps = {
  text: string;
  onPress: () => void;
};

const PrimaryButton = ({ text, onPress }: PrimaryButtonsProps) => {
  return (
    <TouchableOpacity style={styles.borderButton} onPress={onPress}>
      <Text style={styles.borderButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  borderButton: {
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  borderButtonText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { PrimaryButton };

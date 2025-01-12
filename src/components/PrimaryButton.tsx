import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

type PrimaryButtonsProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
};

const PrimaryButton = ({
  text,
  onPress,
  style,
  textStyle,
}: PrimaryButtonsProps) => {
  return (
    <TouchableOpacity style={[styles.borderButton, style]} onPress={onPress}>
      <Text style={[styles.borderButtonText, textStyle]}>{text}</Text>
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

import { Modal, StyleSheet, Pressable, Text, Button } from "react-native";
import { useTheme } from "@react-navigation/native";
import SpinnerButton from "../Buttons/SpinnerButton";

export default function ModalCustom({ children, visible, setVisible }) {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
    },
    modalContent: {
      height: "90%",
      padding: 10,
      backgroundColor: "#fff",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      alignItems: "center",
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
      styles={styles.modal}
    >
      <Button title="fermer" onPress={() => setVisible(false)} />
      <Pressable style={styles.modalContent}>{children}</Pressable>
    </Modal>
  );
}

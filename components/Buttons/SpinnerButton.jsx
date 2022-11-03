import { Pressable, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function SpinnerButton({ action, loading, children, style }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    button: style
      ? style
      : {
          backgroundColor: colors.primary,
          padding: 10,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        },
  });
  return (
    <Pressable onPress={() => action()} style={styles.button}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.text} />
      ) : (
        children
      )}
    </Pressable>
  );
}

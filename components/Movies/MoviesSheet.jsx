import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useTheme } from '@react-navigation/native';

export default function MoviesSheet({ item, navigation = null }) {
  const { colors } = useTheme();
  const goToMovie = () => {
    navigation && (navigation.navigate("Movie", { movie: item }));
  };

  const styles = StyleSheet.create({
    movieSheetContainer: {
      border: "3px solid #000",
      width: "50%",
      alignItems: "center",
      margin: 10,
    },
    title: {
      textAlign: "center",
      color: colors.text,
    },
    imageReponsive: {
      aspectRatio: 2/3,
      width: '100%',
      maxWidth: 200,
    }
  });

  return (
    <View style={styles.movieSheetContainer}>
      <Pressable onPress={goToMovie} style={{alignItems: 'center'}}>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          source={{ uri: item.poster }}
          style={styles.imageReponsive}
          />
      </Pressable>
    </View>
  );
}


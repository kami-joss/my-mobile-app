import { useTheme } from "@react-navigation/native";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { userSelector } from "../store/selectors/userSelector";
import { useEffect, useState } from "react";
import api from "../axiosConfig";
import MoviesSheet from "../components/Movies/MoviesSheet";
import { useIsFocused } from "@react-navigation/native";

export default function ShortListScreen({ navigation, route }) {
  const auth = useSelector(userSelector);
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      api
        .get("/movies/member", {
          params: {
            id: auth.user.id,
          },
        })
        .then((res) => {
          console.log(res.data);
          setMovies(res.data.movies);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [isFocused]);

  const styles = StyleSheet.create({
    loginButton: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 100,
      margin: 10,
    },
    loginButtonText: {
      color: colors.text,
      textAlign: "center",
      fontWeight: "bold",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  if (loading && auth) {
    return <ActivityIndicator size="large" style={{ margin: 30 }} />;
  }

  if (!auth) {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text
            style={{ color: colors.text, fontSize: 18, marginVertical: 10 }}
          >
            Connectez-vous pour voir votre liste de films.
          </Text>
          <Text style={{ color: colors.text }}>Pas encore de compte ?</Text>
          <Pressable
            style={styles.loginButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.loginButtonText}>S'inscrire</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (movies.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{color: colors.text}}> Vous n'avez aucun film dans votre liste de film à voir. </Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MoviesSheet item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        initialNumToRender={20}
      />
    </View>
  );
}

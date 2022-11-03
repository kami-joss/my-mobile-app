import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, FlatList } from "react-native";
import api from "../axiosConfig";
import MoviesSheet from "../components/Movies/MoviesSheet";

export default function UpcomingScreen({ navigation }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api
      .get("/movies/upcoming")
      .then((res) => {
        setMovies(res.data.movies);
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <SafeAreaView>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MoviesSheet item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        initialNumToRender={20}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});

import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import api from "../axiosConfig";
import MoviesSheet from "../components/Movies/MoviesSheet";
import { userSelector } from "../store/selectors/userSelector";
import { useSelector } from "react-redux";

export default function MoviesIndexScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/movies/list", {
        params: {
          limit: 300,
          order: "popularity",
        },
      })
      .then((res) => {
        setMovies(res.data.movies);
        setLoading(false);
      })
      .catch((err) => console.log(err));    
  }, []);

  const goTo = () => {
    navigation.navigate("profileScreen");
  };

  return loading ? (
    <ActivityIndicator size="large" style={{margin: 30}} />
  ) : (
    <SafeAreaView>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  movieSheetContainer: {
    marginVertical: 10,
  },
});

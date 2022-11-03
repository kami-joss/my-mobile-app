import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";
import api from "../axiosConfig";
import { useTheme } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@rneui/base";
import { userSelector } from "../store/selectors/userSelector";
import { updateAuthMoviesAction } from "../store/actions/updateAuthMoviesAction";
import SpinnerButton from "../components/Buttons/SpinnerButton";
import getContacts from "../utils/getContacts";
import ModalCustom from "../components/Modales/Modal";
import CheckList from "../components/Forms/CheckList";

export default function MovieScreen(props) {
  const [movie, setMovie] = useState(props.route.params.movie);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const [modalContacts, setModalContacts] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const auth = useSelector(userSelector);
  const dispatch = useDispatch();

  const { colors } = useTheme();

  useEffect(() => {
    api
      .get("/movies/movie", {
        params: {
          id: movie.id,
        },
      })
      .then((res) => {
        setMovie(res.data.movie);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const addToAuthList = () => {
    setLoadingButton(true);
    api
      .post("/movies/movie", {
        id: movie.id,
        state: 0,
        token: auth.token,
      })
      .then((res) => {
        const newAuthMovies = [...auth.movies, movie.id];
        dispatch(updateAuthMoviesAction(newAuthMovies));
        setLoadingButton(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoadingButton(false);
      });
  };

  const RemoveFromAuthList = () => {
    setLoadingButton(true);
    api
      .delete("/movies/movie", {
        params: {
          id: movie.id,
          token: auth.token,
        },
      })
      .then((res) => {
        const newAuthMovies = auth.movies.filter((m) => m !== movie.id);
        dispatch(updateAuthMoviesAction(newAuthMovies));
        setLoadingButton(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingButton(false);
      });
  };

  const openContactsList = async () => {
    const contactsList = await getContacts();
    if (contactsList) {
      setContacts(contactsList);
      setModalContacts(true);
    }
  };

  const styles = StyleSheet.create({
    imageReponsive: {
      aspectRatio: 2 / 3,
      width: "100%",
      maxHeight: 400,
    },
    container: {
      flex: 1,
      margin: 10,
    },
    title: {
      fontSize: 30,
      textAlign: "center",
      marginBottom: 20,
      paddingHorizontal: 5,
    },
    text: {
      color: colors.text,
    },
    buttonAddList: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 100,
      margin: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonInvitation: {
      backgroundColor: colors.secondary,
      padding: 10,
      borderRadius: 100,
      margin: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    textSynopsis: {
      marginVertical: 10,
      borderRadius: 10,
      color: colors.text,
    },
    buttonRemoveList: {
      backgroundColor: "#000",
      padding: 10,
      borderRadius: 100,
      margin: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderColor: colors.primary,
      borderWidth: 1,
    },
  });

  return loading ? (
    <ActivityIndicator size="large" style={{ margin: 30 }} />
  ) : (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <ModalCustom visible={modalContacts} setVisible={setModalContacts}>
        <CheckList
          items={contacts}
          selectedItems={selectedContacts}
          setSelectedItems={setSelectedContacts}
        />
      </ModalCustom>

      <Text style={[styles.title, styles.text]}>{movie.title}</Text>
      <Image source={{ uri: movie.poster }} style={styles.imageReponsive} />

      <View style={{ margin: 10 }}>
        <Text style={styles.text}>
          Date de production: {movie.production_year}
        </Text>
        <Text style={styles.text}>Durée: {movie.duration} minutes</Text>
        <Text style={styles.text}>
          Genre:
          {movie.genres.map((genre, index, genres) =>
            index < genres.length - 1 ? " " + genre + "," : " " + genre
          )}
        </Text>
        <Text style={styles.text}>Synopsis: </Text>
        <Text style={styles.textSynopsis}>{movie.synopsis}</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        {auth && (
          <View>
            {!auth.movies?.includes(movie.id) ? (
              <SpinnerButton
                action={addToAuthList}
                loading={loadingButton}
                style={styles.buttonAddList}
              >
                <Icon
                  name="add"
                  size={20}
                  color={colors.text}
                  style={{ marginHorizontal: 3 }}
                />
                <Text style={{ marginHorizontal: 3, color: colors.text }}>
                  Ajouter à ma liste
                </Text>
              </SpinnerButton>
            ) : (
              <SpinnerButton
                action={RemoveFromAuthList}
                loading={loadingButton}
                style={styles.buttonRemoveList}
              >
                <Icon
                  name="remove"
                  size={20}
                  color={colors.text}
                  style={{ marginHorizontal: 3 }}
                />
                <Text style={{ marginHorizontal: 3, color: colors.text }}>
                  Retirer de ma liste
                </Text>
              </SpinnerButton>
            )}
          </View>
        )}

        <SpinnerButton
          style={styles.buttonInvitation}
          action={() => openContactsList()}
        >
          <Icon
            name="send"
            size={20}
            color={colors.text}
            style={{ marginHorizontal: 3 }}
          />
          <Text style={{ marginHorizontal: 3, color: colors.text }}>
            Inviter un ami à le voir
          </Text>
        </SpinnerButton>
      </View>
    </ScrollView>
  );
}

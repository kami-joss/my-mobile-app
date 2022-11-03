import { useCallback, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import api from "../axiosConfig";
import MD5 from "crypto-js/md5";
import { userSelector } from "../store/selectors/userSelector";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/actions/loginAction";

export default LoginScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    login: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const auth = useSelector(userSelector);
  const dispatch = useDispatch();
  const onLogin = useCallback((auth) => {
    dispatch(loginAction(auth));
  });

  const { colors } = useTheme();

  const validate = (form) => {
    if (form.login.length < 1) {
      setErrors({ login: "Le nom d'utilisateur est requis" });
      return;
    }
    if (form.password.length < 1) {
      setErrors({ password: "Mot de passe requis" });
      return;
    }
    setErrors(null);
  };

  const handleLogin = () => {
    validate(form);
    if (errors) {
      return;
    }

    const formFormatted = {
      ...form,
      password: MD5(form.password).toString(),
    };

    api
      .post("/members/auth", formFormatted)
      .then((res) => {
        let data = res.data;
        api
          .get("/movies/member", {
            params: {
              id: res.data.user.id,
            }
          })
          .then((res) => {
            data.movies = res.data.movies.map((movie) => movie.id),
            onLogin({ ...data });
            navigation.navigate("Home");
          })
          .catch((err) => console.log(err.response));

      })
      .catch((err) => {
        switch (err.response.data.errors[0].code) {
          case 4003: {
            setErrors({ password: err.response.data.errors[0].text });
            break;
          }
          case 4002: {
            setErrors({ login: err.response.data.errors[0].text });
            break;
          }
        }
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      fontWeight: "bold",
    },
    input: {
      height: 40,
      width: 200,
      margin: 12,
      borderWidth: 1,
      borderColor: "white",
      borderRadius: 5,
      padding: 10,
      color: colors.text,
    },
    text: {
      color: colors.text,
    },
    authButton: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 100,
    },
    textAuthButton: {
      color: colors.text,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text]}> FilmZ </Text>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        placeholderTextColor="grey"
        onChangeText={(text) => setForm({ ...form, login: text })}
        value={form.login}
      />
      {errors?.login && <Text style={{ color: "red" }}>{errors.login}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="grey"
        onChangeText={(text) => setForm({ ...form, password: text })}
        value={form.password}
        secureTextEntry={true}
      />
      {errors?.password && (
        <Text style={{ color: "red" }}>{errors.password}</Text>
      )}
      <Text style={styles.text}>
        {" "}
        Pas encore de compte ?{" "}
        <Text onPress={() => navigation.navigate("Register")}>
          {" "}
          Créer un compte{" "}
        </Text>
      </Text>
      <View style={{ margin: 10 }}>
        <Pressable style={styles.authButton} onPress={() => handleLogin()}>
          <Text style={styles.textAuthButton}> Se connecter </Text>
        </Pressable>
      </View>
    </View>
  );
};

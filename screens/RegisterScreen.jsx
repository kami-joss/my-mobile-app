import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import api from "../axiosConfig";
import MD5 from "crypto-js/md5";

export default RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    login: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const validate = (form) => {
    if (form.login.length < 3) {
      setErrors({
        login: "Le nom d'utilisateur doit faire au moins 3 caractères",
      });
      return;
    }
    if (form.password.length < 3) {
      setErrors({
        password: "Le mot de passe doit faire au moins 3 caractères",
      });
      return;
    }
    if (form.email.length < 6) {
      setErrors({ email: "L'email doit faire au moins 6 caractères" });
      return;
    }
    setErrors(null)
  };

  const handleRegister = async () => {
    validate(form);
    if (errors) {
      return;
    }
    const formValidated = {
      ...form,
      password: form.password,
    };

    api
      .post("/members/signup", formValidated)
      .then((res) => {
        navigation.navigate("Login");
      })
      .catch((err, res) => {
        console.log("ERREUR =>", err.response.data);
        switch (err.response.data.errors[0].code) {
          case 3006:
            setErrors({ email: err.response.data.errors[0].text });
            break;
          case 4004 || 3001:
            setErrors({ login: err.response.data.errors[0].text });
            break;
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
      marginTop: 10,
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
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="grey"
        onChangeText={(text) => setForm({ ...form, email: text })}
        value={form.email}
      />
      {errors?.email && (<Text style={{ color: "red" }}>{errors.email}</Text>)}
      <Text style={styles.text}>
        {" "}
        Déjà membre ?{" "}
        <Text onPress={() => navigation.navigate("Login")}>
          {" "}
          Se connecter{" "}
        </Text>{" "}
      </Text>
      <Pressable style={styles.authButton} onPress={() => handleRegister()}>
        <Text style={styles.textAuthButton}> S'inscrire </Text>
      </Pressable>
    </View>
  );
};

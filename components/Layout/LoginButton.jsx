import { Button, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";
import { userSelector } from "../../store/selectors/userSelector";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import api from "../../axiosConfig";
import { Icon } from "@rneui/themed";
import { logoutAction } from "../../store/actions/logoutAction";

export default function LoginButton({ navigation }) {
  const auth = useSelector(userSelector);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  const logout = () => {
    api
      .post("/members/destroy", { token: auth.token })
      .then((res) => {
        onLogout();
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    authName: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "bold",
    },
    authButton: {
      backgroundColor: colors.primary,
      padding: 7,
      borderRadius: 100,
    },
  });

  return auth ? (
    <Pressable
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => logout()}
    >
      <Text style={styles.authName}> {auth.user.login} </Text>
      <Icon name="logout" size={24} color={colors.text} />
    </Pressable>
  ) : (
    <Pressable
      onPress={() => navigation.navigate("Member")}
      style={styles.authButton}
    >
      <Text style={styles.authName}> Se connecter </Text>
    </Pressable>
  );
}

import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./store/index"
import { Provider } from "react-redux";

import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import LoginButton from "./components/Layout/LoginButton";
import LoginStack from "./stacks/LoginStack";

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "rgb(255, 45, 85)",
    text: "rgb(255, 255, 255)",
    background: "rgb(24, 25, 25)",
    secondary: "rgb(85, 189, 244)",
  },
  dark: true,
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation, route }) => ({
              title: "FilmZ",
              headerRight: () => <LoginButton navigation={navigation} />,
            })}
          />
          <Stack.Screen name="Movie" component={MovieScreen} />
          <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Connexion'}} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{title: 'Inscription'}} />
          <Stack.Screen
            name="Member"
            component={LoginStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

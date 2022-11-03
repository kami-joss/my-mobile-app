import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function LoginStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Connexion'}} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{title: 'Inscription'}} />
        </Stack.Navigator>
    )
}
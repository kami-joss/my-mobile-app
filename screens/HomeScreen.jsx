import { View, Text } from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";

import UpcomingScreen from "./UpcomingScreen";
import MoviesIndexScreen from "./MoviesIndexScreen";
import ShortListScreen from "./ShortListScreen";

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movies"
        component={MoviesIndexScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Films",
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Icon
                  name="film"
                  type="font-awesome"
                  style={{ width: 25 }}
                  color={focused ? colors.primary : "grey"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Upcoming-movies"
        component={UpcomingScreen}
        options={{
          headerShown: false,
          tabBarLabel: "A venir",
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Icon
                  name="timer"
                  style={{ width: 25 }}
                  color={focused ? colors.primary : "grey"}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Short-list"
        component={ShortListScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Ma liste",
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Icon
                  name="list"
                  type="font-awesome"
                  style={{ width: 25 }}
                  color={focused ? colors.primary : "grey"}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

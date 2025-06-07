import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import LocationSelectScreen from "../screens/story/LocationSelectScreen";
import StorySummaryScreen from "../screens/story/StorySummaryScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="LocationSelectScreen" component={LocationSelectScreen} />
        <Stack.Screen name="StorySummaryScreen" component={StorySummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CreateStoryScreen from "../screens/story/CharacterSelectScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import CharacterSelectScreen from "../screens/story/CharacterSelectScreen";
import LocationSelectScreen from "../screens/story/LocationSelectScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          let iconColor = focused ? "#FFD700" : "#C0C0C0"; 

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Create") {
            iconName = "add-circle";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else {
            iconName = "ellipse";
          }

          return (
            <Ionicons
              name={iconName}
              size={focused ? size + 8 : size} 
              color={iconColor}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#FFF",
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Create"
        component={CharacterSelectScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "./src/screens/Home";
import ProgressScreen from "./src/screens/Progress";
import BlogScreen from "./src/screens/Blog";
import FormScreen from "./src/screens/Form";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// Tab Navigator berisi Home, Progress, Blog
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Progress") iconName = "bar-chart";
          else if (route.name === "Blog") iconName = "book";
          else if (route.name === "Form") iconName = "add-circle";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2e8b57",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Blog" component={BlogScreen} />
      <Tab.Screen name="Form" component={FormScreen} />
    </Tab.Navigator>
  );
}
// Stack utama untuk menggabungkan Tab + Form
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Form" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

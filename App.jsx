import * as DevClient from 'expo-dev-client';
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
// Screens
import HomeScreen from "./src/screens/Home";
import ProgressScreen from "./src/screens/Progress";
import BlogScreen from "./src/screens/Blog";
import CeritaScreen from "./src/screens/Cerita";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

async function registerForNotifications() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Izin notifikasi ditolak!');
      return;
    }
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}

// Tab Navigator berisi Home, Progress, Blog
function TabNavigator() {
  useEffect(() => {
    registerForNotifications();
  }, []);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Progress") iconName = "bar-chart";
          else if (route.name === "Blog") iconName = "book";
          else if (route.name === "Ceritaku") iconName = "add-circle";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2e8b57",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Blog" component={BlogScreen} />
      <Tab.Screen name="Ceritaku" component={CeritaScreen} />
    </Tab.Navigator>
  );
}
// Stack utama untuk menggabungkan Tab + Form
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Ceritaku" component={CeritaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

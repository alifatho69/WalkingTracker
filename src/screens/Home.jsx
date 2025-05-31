import React, { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { View, Text, Button, StyleSheet, Animated, Alert } from "react-native";
import NavbarButton from "react-native-navbar/NavbarButton";

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // nilai awal opacity: 0

  useEffect(() => {
    // Set notifikasi handler supaya notif bisa muncul dengan alert & suara
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Animasi fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Minta izin notifikasi
    requestNotificationPermission();
  }, []);

  async function requestNotificationPermission() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Izin notifikasi ditolak', 'Kamu harus mengizinkan notifikasi agar fitur ini berjalan.');
        return;
      }
    } else {
      Alert.alert('Error', 'Harus dijalankan di perangkat asli, bukan emulator.');
    }
  }

  async function kirimNotifikasiLokal() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Halo user !!! 👋",
        body: "Jangan lupa update aktivitas jalanmu hari ini!",
        sound: "default",
      },
      trigger: { seconds: 5 },
    });
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <NavbarButton />
      <Text style={styles.title}>WalkingTracker</Text>
      <Button title="Lihat Progress" onPress={() => navigation.navigate("Progress")} />
      <Button title="Baca Blog" onPress={() => navigation.navigate("Blog")} />
      <Button title="Kirim Notifikasi Lokal" onPress={kirimNotifikasiLokal} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

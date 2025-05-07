import React, { useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet, Animated } from "react-native";
import NavbarButton from "react-native-navbar/NavbarButton";

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // inisialisasi nilai awal opacity: 0
  
  // Jalankan animasi saat komponen tampil
  // Gunakan useRef untuk menyimpan nilai animasi agar tidak di-reset setiap render
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Opacity
      duration: 1000, // Durasi Animasi: 1000ms
      useNativeDriver: true, // Biar gak lag
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <NavbarButton />
      <Text style={styles.title}>WalkingTracker</Text>
      <Button title="Lihat Progress" onPress={() => navigation.navigate("Progress")} />
      <Button title="Baca Blog" onPress={() => navigation.navigate("Blog")} />
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

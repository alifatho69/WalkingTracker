// src/screens/Progress/index.jsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function ProgressScreen() {
  const [target, setTarget] = useState(null);
  const [distance, setDistance] = useState(0);
  const [input, setInput] = useState("");
  const [targetInput, setTargetInput] = useState("");

  const handleSetTarget = () => {
    const num = parseFloat(targetInput);
    if (!isNaN(num)) {
      setTarget(num);
      setTargetInput("");
    }
  };

  const addDistance = () => {
    const num = parseFloat(input);
    if (!isNaN(num)) {
      setDistance(distance + num);
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Jalan</Text>
      {target === null ? (
        <>
          <Text style={styles.text}>Masukkan target berjalan kamu hari ini:</Text>
          <TextInput
            style={styles.input}
            placeholder="Target (km)"
            keyboardType="numeric"
            value={targetInput}
            onChangeText={setTargetInput}
          />
          <Button title="Set Target" onPress={handleSetTarget} />
        </>
      ) : (
        <>
          <Text style={styles.text}>Target: {target} km</Text>
          <Text style={styles.text}>Total Jarak: {distance.toFixed(2)} km</Text>
          <TextInput
            style={styles.input}
            placeholder="Tambah jarak (km)"
            keyboardType="numeric"
            value={input}
            onChangeText={setInput}
          />
          <Button title="Tambah Jarak" onPress={addDistance} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#2e8b57",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
});
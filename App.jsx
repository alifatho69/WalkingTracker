import React, { useState } from "react";
import { FlatList, View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";

const items = [
  { id: '0', text: 'Menyehatkan jantung ❤️ → Bisa menurunkan risiko penyakit jantung dan tekanan darah tinggi.' },
  { id: '1', text: 'Membantu menurunkan berat badan ⚖️ → Jalan kaki rutin bisa bakar kalori tanpa ribet.' },
  { id: '2', text: 'Mengurangi stres 😌 → Bikin pikiran lebih tenang dan mood jadi lebih baik.' },
  { id: '3', text: 'Meningkatkan kekuatan otot & tulang 🦵 → Biar nggak gampang pegel dan tetap kuat.' },
  { id: '4', text: 'Mengurangi risiko diabetes 🍬 → Bantu tubuh mengontrol kadar gula dalam darah.' },
];

export default function App() {
  const [userName, setUserName] = useState("");
  const [goalSteps, setGoalSteps] = useState("");
  const [currentSteps, setCurrentSteps] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = () => {
    if (!userName || !goalSteps) {
      alert("Silakan masukkan nama dan tujuan langkah!");
    } else {
      setIsTracking(true);
    }
  };

  const addStep = () => {
    setCurrentSteps(currentSteps + 1);
  };

  return (
    <View style={styles.container}>
      {!isTracking ? (
        <>
          <Text style={styles.title}>Selamat Datang di WalkingTracker!</Text>
          <Text style={styles.subtitle}>Ayo mulai berjalan!</Text>

          <TextInput
            style={styles.input}
            placeholder="Masukkan Nama Anda"
            value={userName}
            onChangeText={setUserName}
          />

          <TextInput
            style={styles.input}
            placeholder="Tujuan Langkah Harian"
            value={goalSteps}
            keyboardType="numeric"
            onChangeText={setGoalSteps}
          />

          <Button title="Mulai Melacak" onPress={startTracking} />
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Halo, {userName}!</Text>
          <Text style={styles.subtitle}>Tujuan langkah harian: {goalSteps}</Text>

          <Text style={styles.steps}>Langkah saat ini: {currentSteps}</Text>

          <Button title="Tambah Langkah" onPress={addStep} />
          <Button title="Reset" onPress={() => setIsTracking(false)} color="red" />

          <Text style={styles.title}>Manfaat Jalan Kaki</Text>

          <FlatList
            contentContainerStyle={styles.listContainer}
            data={items}
            renderItem={({ item }) => <Text style={styles.row}>{item.text}</Text>}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
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
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2e8b57",
  },
  subtitle: {
    fontSize: 18,
    color: "#696969",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#2e8b57",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  steps: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2e8b57",
    marginBottom: 20,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
    textAlign: "center",
    borderRadius: 5,
  },
});


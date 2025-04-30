import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";

export default function FormScreen({ navigation }) {
  const [activity, setActivity] = useState("");
  const [distance, setDistance] = useState("");
  const [cerita, setCerita] = useState("");
  const [dataList, setDataList] = useState([]); // Menyimpan data aktivitas

  const handleSubmit = () => {
    if (activity && distance) {
      const newData = {
        id: Date.now().toString(),
        activity,
        distance,
        cerita,
      };
      setDataList([...dataList, newData]); // Tambah data ke list
      setActivity("");
      setDistance("");
      setCerita("");
      Alert.alert("Data Ditambahkan", `Aktivitas: ${activity}\nJarak: ${distance} km`);
    } else {
      Alert.alert("Error", "Semua field harus diisi!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diary Kegiatan Olahraga</Text>
      <TextInput
        style={styles.input}
        placeholder="Jenis Aktivitas"
        value={activity}
        onChangeText={setActivity}
      />
      <TextInput
        style={styles.input}
        placeholder="Jarak (km)"
        value={distance}
        keyboardType="numeric"
        onChangeText={setDistance}
      />
      <TextInput
        style={styles.input}
        placeholder="Isi ceritamu"
        value={cerita}
        onChangeText={setCerita}
      />
      <Button title="Simpan Data" onPress={handleSubmit} />

      <Text style={styles.subtitle}>Daftar Aktivitas</Text>
      {dataList.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text>Aktivitas: {item.activity}</Text>
          <Text>Jarak: {item.distance} km</Text>
          <Text>Jarak: {item.cerita} km</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f8ff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#2e8b57",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#d0f0c0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});

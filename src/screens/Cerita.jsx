import { useState, useEffect } from "react";
import { Animated, View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";

export default function CeritaScreen({ navigation }) {
  const [nama, setNama] = useState("");
  const [activity, setActivity] = useState("");
  const [distance, setDistance] = useState("");
  const [cerita, setCerita] = useState("");
  const [dataList, setDataList] = useState([]); // Menyimpan data aktivitas
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  
  const fadeAnim = useState(new Animated.Value(0))[0]; // nilai awal opacity: 0
  // Jalankan animasi saat komponen tampil
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,             // Akhir opacity: 1
      duration: 800,          // Durasi animasi: 800ms
      useNativeDriver: true,  // Optimasi animasi
    }).start();

    fetchData();
  }, []);


  const handleSubmit = async () => {
  if (activity && distance && cerita) {
    const newData = {
      nama: nama,
      jenis_aktifitas: activity,
      target: parseFloat(distance),
      cerita_hari_ini: cerita,
      createAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://6820a535259dad2655ad281a.mockapi.io/ceritaku/tb_ceritaku", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      const savedData = await response.json();
      setDataList([...dataList, savedData]); // Tambah ke list dari response API
      setActivity("");
      setDistance("");
      setCerita("");
      Alert.alert("Sukses", "Data berhasil dikirim ke server!");
    } catch (error) {
      Alert.alert("Gagal", "Terjadi kesalahan saat mengirim data.");
      console.error("Submit Error:", error);
    }
  } else {
    Alert.alert("Error", "Semua field harus diisi!");
  }
};

const fetchData = async () => {
  try {
    const response = await fetch("https://6820a535259dad2655ad281a.mockapi.io/ceritaku/tb_ceritaku");
    const result = await response.json();
    setDataList(result);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};

const startEdit = (item) => {
  setIsEditing(true);
  setEditingId(item.id);
  setActivity(item.jenis_aktifitas);
  setDistance(String(item.target));
  setCerita(item.cerita_hari_ini);
  setNama(item.nama);
};

const handleUpdate = async () => {
  const updatedData = {
    nama,
    jenis_aktifitas: activity,
    target: parseFloat(distance),
    cerita_hari_ini: cerita,
    createAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(`https://6820a535259dad2655ad281a.mockapi.io/ceritaku/tb_ceritaku/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const result = await response.json();
    setDataList(dataList.map((item) => (item.id === editingId ? result : item)));
    resetForm();
    Alert.alert("Berhasil", "Data berhasil diupdate!");
  } catch (err) {
    Alert.alert("Error", "Gagal update data.");
  }
};

const handleDelete = async (id) => {
  try {
    await fetch(`https://6820a535259dad2655ad281a.mockapi.io/ceritaku/tb_ceritaku/${id}`, {
      method: "DELETE",
    });
    setDataList(dataList.filter((item) => item.id !== id));
    Alert.alert("Dihapus", "Data berhasil dihapus.");
  } catch (err) {
    Alert.alert("Error", "Gagal hapus data.");
  }
};

const resetForm = () => {
  setNama("");
  setActivity("");
  setDistance("");
  setCerita("");
  setIsEditing(false);
  setEditingId(null);
};






  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Animated.View style={{ opacity: fadeAnim }}>
      {/* Semuanya dibungkus */}
      <Text style={styles.title}>Tambah Aktivitas Jalan</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={nama}
          onChangeText={setNama}
        />
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
          placeholder="Cerita Aktivitas"
          value={cerita}
          onChangeText={setCerita}
        />
        <Button
          title={isEditing ? "Update Data" : "Simpan Data"}
          onPress={handleSubmit}
        />

    </Animated.View>

    <Text style={styles.subtitle}>Daftar Aktivitas</Text>
    {dataList.map((item) => (
        <Animated.View key={item.id} style={styles.card}>
          <Text>Nama: {item.nama}</Text>
          <Text>Aktivitas: {item.jenis_aktifitas}</Text>
          <Text>Target: {item.target} km</Text>
          <Text>Cerita: {item.cerita_hari_ini}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
            <Button title="Edit" onPress={() => startEdit(item)} />
            <Button title="Hapus" color="red" onPress={() => handleDelete(item.id)} />
          </View>
        </Animated.View>
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

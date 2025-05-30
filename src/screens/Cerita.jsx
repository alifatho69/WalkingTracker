import * as DevClient from 'expo-dev-client';
import * as Notifications from 'expo-notifications';
import { useState, useEffect } from "react";
import {
  View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Animated, Platform
} from "react-native";
import {
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc,
} from "firebase/firestore";
import { db } from "../firebase"; // pastikan path ke firebase.js benar
import { globalPushToken } from "../../App";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function CeritaScreen() {
  const [nama, setNama] = useState("");
  const [activity, setActivity] = useState("");
  const [distance, setDistance] = useState("");
  const [cerita, setCerita] = useState("");
  const [dataList, setDataList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    fetchData();

    async function getPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Izin notifikasi ditolak!');
      }
    }

    if (Platform.OS !== 'web') {
      getPermissions();
    }
  }, []);

  // Tambahkan fungsi ini
  async function sendLocalNotification(namaUser) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Aktivitas Baru Ditambahkan 🚶",
        body: `Halo ${namaUser}, data ceritamu berhasil disimpan!`,
        sound: "default",
      },
      trigger: null, // segera tampil
    });
  }


  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ceritaku"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataList(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleSubmit = async () => {
    if (!nama || !activity || !distance || !cerita) {
      Alert.alert("Error", "Semua field harus diisi!");
      return;
    }

    const docData = {
      nama,
      jenis_aktifitas: activity,
      target: parseFloat(distance),
      cerita_hari_ini: cerita,
      createAt: new Date().toISOString(),
    };

    try {
      if (isEditing) {
        // Update dokumen yang sudah ada
        const docRef = doc(db, "ceritaku", editingId);
        await updateDoc(docRef, docData);
      } else {
        // Tambah dokumen baru
        await addDoc(collection(db, "ceritaku"), docData);
      }

      Alert.alert("Berhasil", "Data berhasil disimpan!");
      await sendLocalNotification(nama); // Notifikasi muncul tiap berhasil simpan
      resetForm();
      fetchData();

    } catch (err) {
      Alert.alert("Error", "Gagal menyimpan data.");
      console.error("HandleSubmit error:", err);
    }
  };


  const startEdit = (item) => {
    setIsEditing(true);
    setEditingId(item.id);
    setNama(item.nama);
    setActivity(item.jenis_aktifitas);
    setDistance(String(item.target));
    setCerita(item.cerita_hari_ini);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "ceritaku", id));
      Alert.alert("Berhasil", "Data berhasil dihapus.");
      fetchData();
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
        <Text style={styles.title}>Tambah Cerita Aktivitas Jalan</Text>
        <TextInput style={styles.input} placeholder="Nama" value={nama} onChangeText={setNama} />
        <TextInput style={styles.input} placeholder="Jenis Aktivitas" value={activity} onChangeText={setActivity} />
        <TextInput style={styles.input} placeholder="Target (km)" value={distance} keyboardType="numeric" onChangeText={setDistance} />
        <TextInput style={styles.input} placeholder="Cerita Hari Ini" value={cerita} onChangeText={setCerita} />
        <Button title={isEditing ? "Update Data" : "Simpan Data"} onPress={handleSubmit} />
      </Animated.View>

      <Text style={styles.subtitle}>Daftar Cerita</Text>
      {dataList.map((item) => (
        <Animated.View key={item.id} style={styles.card}>
          <Text>Nama: {item.nama}</Text>
          <Text>Aktivitas: {item.jenis_aktifitas}</Text>
          <Text>Target: {item.target} km</Text>
          <Text>Cerita: {item.cerita_hari_ini}</Text>
          <Text>Tanggal: {new Date(item.createAt).toLocaleDateString()}</Text>
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

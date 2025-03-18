import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [goalSteps, setGoalSteps] = useState('');

  const startTracking = () => {
    if (!userName || !goalSteps) {
      alert('Peringatan', 'Silakan masukkan nama dan tujuan langkah.');
    } else {
      navigation.navigate('Tracker', { userName, goalSteps });
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e8b57',
  },
  subtitle: {
    fontSize: 18,
    color: '#696969',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#2e8b57',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
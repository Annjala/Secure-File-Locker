import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import LoadingSpinner from '../components/LoadingSpinner';

export default function RegisterScreen({ navigation }) {
  const [step, setStep] = useState('request-permission'); // request-permission, detecting-face, input-details
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [faceData, setFaceData] = useState(null);
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  useEffect(() => {
    if (step === 'request-permission') {
      requestCameraPermission();
    }
  }, [step]);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status === 'granted') {
      setStep('detecting-face');
      // Simulate face detection after 2 seconds
      setTimeout(() => {
        captureFace();
      }, 2000);
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required for face registration.');
      navigation.goBack();
    }
  };

  const captureFace = () => {
    // Simulate face capture
    setFaceData({ captured: true, timestamp: Date.now() });
    setStep('input-details');
  };

  const handleRegister = () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }
    if (pin.length < 6) {
      Alert.alert('Error', 'PIN must be at least 6 digits');
      return;
    }
    if (pin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match');
      return;
    }

    // Save registration data (will implement Supabase later)
    Alert.alert('Success', 'Registration successful!', [
      { text: 'OK', onPress: () => navigation.navigate('Welcome') }
    ]);
  };

  if (step === 'request-permission' || step === 'detecting-face') {
    return <LoadingSpinner message="DETECTING FACE" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      <View style={styles.header}>
        <Text style={styles.title}>REGISTER</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="#9CA3AF"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter PIN (min 6 digits)"
          placeholderTextColor="#9CA3AF"
          value={pin}
          onChangeText={setPin}
          keyboardType="numeric"
          secureTextEntry
          maxLength={10}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm PIN"
          placeholderTextColor="#9CA3AF"
          value={confirmPin}
          onChangeText={setConfirmPin}
          keyboardType="numeric"
          secureTextEntry
          maxLength={10}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>REGISTER & GO BACK</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.backButton]} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD6FE',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B21A8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  button: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#6B21A8',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
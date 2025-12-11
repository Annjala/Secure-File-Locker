import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import LoadingSpinner from '../components/LoadingSpinner';

export default function RegisterScreen({ navigation }) {
  const [step, setStep] = useState('request-permission');
  const [permission, requestPermission] = useCameraPermissions();
  const [faceData, setFaceData] = useState(null);
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  useEffect(() => {
    if (step === 'request-permission') {
      handlePermission();
    }
  }, [step]);

  const handlePermission = async () => {
    if (!permission) return;
    
    if (!permission.granted) {
      const result = await requestPermission();
      if (result.granted) {
        setStep('detecting-face');
        setTimeout(() => captureFace(), 2000);
      } else {
        Alert.alert('Permission Denied', 'Camera permission is required.');
        navigation.goBack();
      }
    } else {
      setStep('detecting-face');
      setTimeout(() => captureFace(), 2000);
    }
  };

  const captureFace = () => {
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

    Alert.alert('Success', 'Registration successful!', [
      { text: 'OK', onPress: () => navigation.navigate('Welcome') }
    ]);
  };

  if (step === 'detecting-face') {
    return <LoadingSpinner message="DETECTING FACE" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      <View style={styles.header}>
        <Text style={styles.icon}>📝</Text>
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
  icon: {
    fontSize: 50,
    marginBottom: 10,
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
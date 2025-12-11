import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import LoadingSpinner from '../components/LoadingSpinner';

export default function LoginScreen({ navigation }) {
  const [step, setStep] = useState('request-permission');
  const [permission, requestPermission] = useCameraPermissions();
  const [pin, setPin] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);

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
        setTimeout(() => detectFace(), 2000);
      } else {
        Alert.alert('Permission Denied', 'Camera permission is required.');
        navigation.goBack();
      }
    } else {
      setStep('detecting-face');
      setTimeout(() => detectFace(), 2000);
    }
  };

  const detectFace = () => {
    setStep('checking-liveness');
    setTimeout(() => checkLiveness(), 2000);
  };

  const checkLiveness = () => {
    setStep('enter-pin');
  };

  const handleLogin = () => {
    if (pin === '123456') {
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => navigation.replace('Home') }
      ]);
    } else {
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      
      if (newFailedAttempts >= 3) {
        Alert.alert('Account Locked', 'Too many failed attempts. Locked for 20 minutes.', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Error', `Incorrect PIN. ${3 - newFailedAttempts} attempts remaining.`);
      }
    }
  };

  if (step === 'detecting-face') {
    return <LoadingSpinner message="DETECTING FACE" />;
  }

  if (step === 'checking-liveness') {
    return <LoadingSpinner message="CHECKING LIVENESS" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      <View style={styles.header}>
        <Text style={styles.icon}>🔐</Text>
        <Text style={styles.title}>ENTER PIN</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Enter PIN"
          placeholderTextColor="#9CA3AF"
          value={pin}
          onChangeText={setPin}
          keyboardType="numeric"
          secureTextEntry
          maxLength={10}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.backButton]} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>

        <Text style={styles.testInfo}>Test PIN: 123456</Text>
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
    textAlign: 'center',
    letterSpacing: 5,
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
  testInfo: {
    marginTop: 20,
    textAlign: 'center',
    color: '#8B5CF6',
    fontSize: 12,
  },
});
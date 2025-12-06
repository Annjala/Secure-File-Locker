import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import LoadingSpinner from '../components/LoadingSpinner';

export default function LoginScreen({ navigation }) {
  const [step, setStep] = useState('request-permission'); // request-permission, detecting-face, checking-liveness, enter-pin
  const [hasPermission, setHasPermission] = useState(null);
  const [pin, setPin] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

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
        detectFace();
      }, 2000);
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required for login.');
      navigation.goBack();
    }
  };

  const detectFace = () => {
    // Simulate face detection
    setStep('checking-liveness');
    // Simulate liveness check after 2 seconds
    setTimeout(() => {
      checkLiveness();
    }, 2000);
  };

  const checkLiveness = () => {
    // Simulate liveness check (frame comparison)
    const livenessDetected = true; // In real app, compare multiple frames
    
    if (livenessDetected) {
      setStep('enter-pin');
    } else {
      Alert.alert('Liveness Check Failed', 'Please try again.');
      navigation.goBack();
    }
  };

  const handleLogin = () => {
    // For testing, accept PIN "123456"
    if (pin === '123456') {
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => navigation.replace('Home') }
      ]);
      setFailedAttempts(0);
    } else {
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      
      if (newFailedAttempts >= 3) {
        setIsLocked(true);
        Alert.alert(
          'Account Locked', 
          'Too many failed attempts. Account locked for 20 minutes.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
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

  if (step === 'enter-pin') {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
        
        <View style={styles.header}>
          <Text style={styles.title}>ENTER PIN</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.subtitle}>Enter your 6-digit PIN</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter PIN"
            placeholderTextColor="#9CA3AF"
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
            secureTextEntry
            maxLength={10}
            editable={!isLocked}
          />

          <TouchableOpacity 
            style={[styles.button, isLocked && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={isLocked}
          >
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

  return <LoadingSpinner message="LOADING" />;
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
  subtitle: {
    fontSize: 16,
    color: '#6B21A8',
    textAlign: 'center',
    marginBottom: 20,
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
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
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
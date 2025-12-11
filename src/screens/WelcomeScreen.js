import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      <View style={styles.header}>
        <Text style={styles.icon}>🔒</Text>
        <Text style={styles.title}>SECURE FILE LOCKER</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Protect Your Files with Face Recognition</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  icon: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6B21A8',
    textAlign: 'center',
  },
  content: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B21A8',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  button: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
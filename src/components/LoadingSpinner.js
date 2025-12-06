import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

export default function LoadingSpinner({ message }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#8B5CF6" />
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.subMessage}>PLEASE WAIT FOR A MOMENT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD6FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B21A8',
    textAlign: 'center',
  },
  subMessage: {
    marginTop: 10,
    fontSize: 14,
    color: '#8B5CF6',
    textAlign: 'center',
  },
});
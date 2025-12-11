import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native';

export default function HomeScreen({ navigation }) {
  const verifyPin = (callback) => {
    Alert.prompt(
      'Security Check',
      'Enter your PIN',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: (pin) => {
            if (pin === '123456') callback();
            else Alert.alert('Error', 'Incorrect PIN');
          }
        }
      ],
      'secure-text'
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🏠</Text>
        <Text style={styles.title}>HOME</Text>
        <Text style={styles.subtitle}>Secure File Vault</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => verifyPin(() => Alert.alert('Add Files', 'Coming soon!'))}
          >
            <Text style={styles.actionIcon}>📤</Text>
            <Text style={styles.actionText}>Add Files</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => verifyPin(() => Alert.alert('View Files', 'Coming soon!'))}
          >
            <Text style={styles.actionIcon}>👁️</Text>
            <Text style={styles.actionText}>View Files</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => verifyPin(() => Alert.alert('Delete Files', 'Coming soon!'))}
          >
            <Text style={styles.actionIcon}>🗑️</Text>
            <Text style={styles.actionText}>Delete Files</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
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
    backgroundColor: '#8B5CF6',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#E9D5FF',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B21A8',
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  actionText: {
    fontSize: 16,
    color: '#6B21A8',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#6B21A8',
    paddingVertical: 15,
    justifyContent: 'space-around',
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 5,
  },
});
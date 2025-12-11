import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar, ScrollView } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => navigation.replace('Welcome') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      <View style={styles.header}>
        <Text style={styles.headerIcon}>👤</Text>
        <Text style={styles.title}>PROFILE</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <Text style={styles.avatar}>👨‍💼</Text>
          <Text style={styles.username}>Test User</Text>
          <Text style={styles.email}>testuser@securelocker.com</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Username:</Text>
            <Text style={styles.infoValue}>Test User</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Face ID:</Text>
            <Text style={styles.infoValue}>Enabled ✓</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
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
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  content: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  avatar: {
    fontSize: 60,
    marginBottom: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6B21A8',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B21A8',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  logoutIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#DC2626',
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
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native';
import { Upload, Eye, Trash2, Home as HomeIcon, User } from 'lucide-react-native';

export default function HomeScreen({ navigation }) {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [files, setFiles] = useState([
    { id: 1, name: 'Document1.pdf', size: '2.5 MB', type: 'PDF', date: '2024-12-01' },
    { id: 2, name: 'Photo.jpg', size: '1.8 MB', type: 'Image', date: '2024-12-02' },
  ]);

  // Session timeout check
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      if (timeSinceLastActivity > 60000) { // 1 minute
        Alert.alert('Session Timeout', 'Your session has expired. Please login again.', [
          { text: 'OK', onPress: () => navigation.replace('Welcome') }
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastActivity]);

  const updateActivity = () => {
    setLastActivity(Date.now());
  };

  const verifyPinAndExecute = (action, callback) => {
    Alert.prompt(
      'Security Check',
      'Enter your PIN to continue',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: (pin) => {
            if (pin === '123456') {
              callback();
            } else {
              Alert.alert('Error', 'Incorrect PIN');
            }
          }
        }
      ],
      'secure-text'
    );
  };

  const handleAddFile = () => {
    updateActivity();
    verifyPinAndExecute('Add File', () => {
      Alert.alert('Add File', 'File upload feature will be implemented here');
    });
  };

  const handleViewFiles = () => {
    updateActivity();
    verifyPinAndExecute('View Files', () => {
      Alert.alert('View Files', 'File viewing feature will be implemented here');
    });
  };

  const handleDeleteFile = () => {
    updateActivity();
    verifyPinAndExecute('Delete File', () => {
      Alert.alert('Delete File', 'File deletion feature will be implemented here');
    });
  };

  return (
    <View style={styles.container} onTouchStart={updateActivity}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>HOME</Text>
        <Text style={styles.subtitle}>Secure File Vault</Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleAddFile}>
            <Upload color="#8B5CF6" size={24} />
            <Text style={styles.actionText}>Add Files</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleViewFiles}>
            <Eye color="#8B5CF6" size={24} />
            <Text style={styles.actionText}>View Files</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleDeleteFile}>
            <Trash2 color="#8B5CF6" size={24} />
            <Text style={styles.actionText}>Delete Files</Text>
          </TouchableOpacity>
        </View>

        {/* File Stats */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Storage Info</Text>
          <Text style={styles.statText}>Total Files: {files.length}</Text>
          <Text style={styles.statText}>Total Size: 4.3 MB / 15 MB</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={updateActivity}>
          <HomeIcon color="#FFFFFF" size={24} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => {
            updateActivity();
            navigation.navigate('Profile');
          }}
        >
          <User color="#FFFFFF" size={24} />
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
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
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
  actionText: {
    fontSize: 16,
    color: '#6B21A8',
    marginLeft: 15,
    fontWeight: '600',
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#6B21A8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 5,
  },
});
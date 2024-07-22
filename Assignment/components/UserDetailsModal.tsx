import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

interface Props {
  isVisible: boolean;
  user: any | null;
  isLoading: boolean;
  onClose: () => void;
}

const UserDetailsModal: React.FC<Props> = ({ isVisible, user, isLoading, onClose }) => {
  if (!user) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user.avatar }}
                style={styles.avatar}
                onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
              />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.row}>
                <Text style={styles.headerLabel}>First Name</Text>
                <Text style={styles.headerFirstName}>{user.first_name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.headerLabel}>Last Name</Text>
                <Text style={styles.headerLastName}>{user.last_name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.headerLabel}>Email</Text>
                <Text style={styles.headerTextEmail}>{user.email}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="grey" />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomRightRadius: 25, 
    borderTopLeftRadius: 25, 
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 20,
    marginTop:10
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    marginTop: 25,
    marginRight:15
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerLabel: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: 5,
  },
  headerText: {
    color: 'black',
  },
  headerFirstName:{
    marginLeft: 15,
    color: 'black',
  },
  headerLastName:{
    marginLeft: 15,
    color: 'black',
  },
  headerTextEmail:{
    marginLeft: 10,
    color: 'black',
  },

  closeButton: {
    backgroundColor: '#3a86a8',
    borderRadius: 2,
    paddingLeft: 15,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomRightRadius: 15,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    marginTop: 20,
  },
});

export default UserDetailsModal;

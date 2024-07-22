import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Modal } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserItem from '../components/UserItem';
import UserDetailsModal from '../components/UserDetailsModal';
import { BASE_URL, USERS_ENDPOINT } from '../apiConfig';
import { UserContext } from '../contexts/UserContext';

const UserInformation = ({ navigation }: { navigation: any }) => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const cachedUsers = await AsyncStorage.getItem('cachedUsers');
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers));
        setFilteredUsers(JSON.parse(cachedUsers));
        setIsLoading(false);
      } else {
        fetchUsersFromApi();
      }
    } catch (error) {
      setError('Error fetching users');
      console.error('Error fetching users:', error);
      fetchUsersFromApi();
    }
  };

  const fetchUsersFromApi = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${USERS_ENDPOINT}?page=2`);
      const usersData = response.data.data;
      setUsers(usersData);
      setFilteredUsers(usersData);
      setIsLoading(false);
      await AsyncStorage.setItem('cachedUsers', JSON.stringify(usersData));
    } catch (error) {
      setError('Error fetching users');
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = async () => {
    if (search) {
      if (users.length > 0) {
        const foundUser = users.find((user) => user.id.toString() === search);
        if (foundUser) {
          setSelectedUser(foundUser);
        } else {
          console.error('User not found locally');
        }
      } else {
        console.error('No users available locally');
      }
    } else {
      setFilteredUsers(users);
    }
  };

  const handleUserPress = async (userId: number) => {
    if (users.length > 0) {
      const foundUser = users.find((user) => user.id === userId);
      if (foundUser) {
        setSelectedUser(foundUser);
      } else {
        console.error('User not found locally');
      }
    } else {
      console.error('No users available locally');
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="User ID"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>AVAILABLE USERS</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleUserPress(item.id)}>
              <UserItem id={item.id.toString()} name={`${item.first_name}`} />
            </TouchableOpacity>
          )}
        />
      </View>

      <UserDetailsModal
        isVisible={!!selectedUser}
        user={selectedUser}
        isLoading={isModalLoading}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#f2f2f2',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: '#3a86a8',
    borderRadius: 2,
    paddingLeft: 15,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomRightRadius: 15,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
  },

    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        color: 'black',
        marginLeft: 15,
    },
});

export default UserInformation;

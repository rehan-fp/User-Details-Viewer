import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, USERS_ENDPOINT } from '../apiConfig';

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const cachedUsers = await AsyncStorage.getItem('cachedUsers');
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers));
        setIsLoading(false);
      } else {
        await fetchUsersFromApi();
      }
    } catch (error) {
      setError('Error fetching users');
      console.error('Error fetching users:', error);
      await fetchUsersFromApi();
    }
  };

  const fetchUsersFromApi = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${USERS_ENDPOINT}?page=2`);
      const usersData = response.data.data;
      setUsers(usersData);
      setIsLoading(false);
      await AsyncStorage.setItem('cachedUsers', JSON.stringify(usersData));
    } catch (error) {
      setError('Error fetching users');
      console.error('Error fetching users:', error);
    }
  };

  const handleUserPress = (userId: number) => {
    const foundUser = users.find((user) => user.id === userId);
    if (foundUser) {
      setSelectedUser(foundUser);
    } else {
      console.error('User not found locally');
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser,
        isLoading,
        error,
        fetchUsers,
        handleUserPress,
        handleCloseModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

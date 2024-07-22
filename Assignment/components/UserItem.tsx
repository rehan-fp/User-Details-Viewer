
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface UserItemProps {
  id: string;
  name: string;
}

const UserItem: React.FC<UserItemProps> = ({ id, name }) => {
  return (
    <View style={styles.userContainer}>
      <View style={styles.row}>
        <Text style={[styles.userText, styles.label]}>ID</Text>
        <Text style={styles.userId}>000{id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.userText, styles.label]}>Name</Text>
        <Text style={styles.userName}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    
  },
  userId: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    marginLeft:75
  },
  userName: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    marginLeft:45
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default UserItem;

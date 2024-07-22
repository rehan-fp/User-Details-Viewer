
import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import StartupScreen from './screens/StartupScreen';
import UserInformation from './screens/UserInformation';
import { UserProvider } from './contexts/UserContext';

const Stack = createStackNavigator();

function App(): React.JSX.Element {

  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Startup">
        <Stack.Screen name="Startup" options={{ headerShown: false }} component={StartupScreen} />
        <Stack.Screen
          name="User Information"
          component={UserInformation}
          options={{
            headerShown: true,
            headerTitle: 'User Information',
            headerStyle: {
              backgroundColor: '#3a86a8', 
            },
            headerTintColor: '#fff', 
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;

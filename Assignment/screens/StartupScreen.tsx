import React from 'react';
import { ImageBackground, StyleSheet,Dimensions } from 'react-native';

const StartupScreen = ({ navigation }: { navigation: any }) => {
  
    setTimeout(() => {
      navigation.navigate('User Information');
    }, 5000);

  return (
    <ImageBackground
      source={require("../assets/splash.png")}
      style={styles.background}
    >
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default StartupScreen;

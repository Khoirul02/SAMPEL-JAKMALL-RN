import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationProp, StackActions} from '@react-navigation/native';
import {colorApp} from '../assets';

interface SplashScreenProps {
  navigation: NavigationProp<any>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(StackActions.replace('Home'));
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Selamat Datang, Kawan!</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorApp.white as string,
  },
});

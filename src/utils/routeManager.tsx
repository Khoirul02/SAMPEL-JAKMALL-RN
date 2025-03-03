import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import SplashScreen from '../screens/Splash';
import HomeScreen from '../screens/Home';

const initStack = createNativeStackNavigator();

const RouteManager: FC = () => {
  return (
    <NavigationContainer>
      <initStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <initStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <initStack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </initStack.Navigator>
    </NavigationContainer>
  );
};

export default RouteManager;

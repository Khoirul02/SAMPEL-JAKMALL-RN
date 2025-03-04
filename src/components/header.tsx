import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { colorApp } from '../assets';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightButtonText?: string;
  onRightPress?: () => void;
}

const CustomHeader: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightButtonText,
  onRightPress,
}) => {
  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity onPress={onBackPress} style={styles.button}>
          <Text style={styles.buttonText}>{'< Back'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}

      <Text style={styles.title}>{title}</Text>

      {rightButtonText ? (
        <TouchableOpacity onPress={onRightPress} style={styles.button}>
          <Text style={styles.buttonText}>{rightButtonText}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: colorApp.primary as string,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  spacer: {
    width: 60,
  },
});

export default CustomHeader;

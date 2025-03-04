import React from 'react';
import {View, StyleSheet} from 'react-native';

// Definisi Props untuk TypeScript
interface GapProps {
  width?: number;
  height?: number;
}

const Gap: React.FC<GapProps> = ({width = 0, height = 0}) => {
  return <View style={[styles.gap, {width, height}]} />;
};

const styles = StyleSheet.create({
  gap: {},
});

export default Gap;

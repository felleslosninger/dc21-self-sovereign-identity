import React from 'react';
import { StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import ConsentButton from '../ConsentButton';
import Menu from '../Menu';

export default function ActivityFrame() {
  return (
    <SafeAreaView style={styles.container}>
      <ConsentButton></ConsentButton>
      <Menu></Menu>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
  },
});

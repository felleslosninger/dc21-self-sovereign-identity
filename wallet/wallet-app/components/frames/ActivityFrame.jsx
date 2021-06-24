import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import ConsentButton from '../ConsentButton';
import Menu from '../Menu';

export default function ActivityFrame() {
  return (
    <SafeAreaView>
      <ConsentButton></ConsentButton>
      <Menu></Menu>
    </SafeAreaView>
  );
}

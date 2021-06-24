import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import TheRequests from '../../requestsex';
import ConsentButton from '../ConsentButton';
import Menu from '../Menu';

export default function ActivityFrame() {
  return (
    <SafeAreaView>
      <ConsentButton></ConsentButton>
      <TheRequests></TheRequests>
      <Menu></Menu>
    </SafeAreaView>
  );
}

import React, { useState } from 'react';
import { View, Text, Button, Switch, StyleSheet } from 'react-native';

export default function ConsentButton() {
  const [toggle, setToggle] = useState(false);

  return (
    <View>
      <Text>Godta at informasjon deles</Text>
      <Text>Du har {toggle ? 'nå' : 'ikke'} delt beviset</Text>
      <Button
        title={toggle ? 'Trekke tilbake' : 'Godta'}
        color="#f1940f"
        onPress={() => setToggle(!toggle)}
      />
    </View>
  );
}
export function Knapp() {
  //const [toggle, setToggle] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const toggleSwitch = () => setIsAccepted((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Text>Ønsker du å dele informasjon?</Text>
      <Switch
        trackColor={{ false: '#949494', true: '#8cc43c' }}
        thumbColor={isAccepted ? '#ffaf7a' : '#f4f3f4'}
        ios_backgroundColor="#f00af7a" //"#f5f5f5"
        onValueChange={toggleSwitch}
        onChange={toggleSwitch}
        value={isAccepted}
      />
      <Text>Nå {isAccepted ? 'deler' : 'tilbakeholder'} du informasjon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

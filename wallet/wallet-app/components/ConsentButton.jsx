import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function ConsentButton() {
  const [toggle, setToggle] = useState(false);

  return (
    <View>
      <Text>Godta at informasjon deles</Text>
      <Text>
        Du har
        {' '}
        {toggle ? 'nå' : 'ikke'}
        {' '}
        delt beviset
      </Text>
      <Button
        title={toggle ? 'Trekke tilbake' : 'Godta'}
        color="#f1940f"
        onPress={() => setToggle(!toggle)}
      />
    </View>
  );
}
export  function Knapp() {
  //const [toggle, setToggle] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const toggleSwitch= () => setIsAccepted(previousState => !previousState);

     return (
      <View>
          <Text>Ønsker du å dele informasjon?</Text>
          <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isAccepted ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              onChange={toggleSwitch}
              value={isAccepted}
          />
          {/*<Text>Du har {toggle ? 'nå' : 'ikke'} delt beviset</Text>
          <Button
              title = {toggle ? 'Trekke tilbake' : "Godta"}
              color="#a6c9c4"
              onPress={() => setToggle(!toggle) }
     />   */}
          <Text>Nå {isAccepted ? 'deler' : 'tilbakeholder'} du informasjon.</Text>    
       </View> 
  )
}
import React, { useState } from 'react';
import { View, Text, Button} from 'react-native';

export default function Knapp() {
    const [toggle, setToggle] = useState(false);
     
       return (
        <View>
            <Text>Godta at informasjon deles</Text>
            <Text>Du har {toggle ? 'nå' : 'ikke'} delt beviset</Text>
            <Button
                title = {toggle ? 'Trekke tilbake' : "Godta"}
                color="#f1940f"
                onPress={() => setToggle(!toggle) }
                />  
            
        </View> 
    )
}

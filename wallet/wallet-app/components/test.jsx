import React, { useState } from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

export default function Test() {
    const [toggle, setToggle] = useState(false);
     
       return (
        <View>
            <Text>Hallo</Text>
           
            <Button 
                title = {toggle ? 'Hade på badet' : "Hei på deg"}
                color="#F6c9c4"
                type="outline"
                //style={styles.raised}
                
                size={26}
                onPress={() => setToggle(!toggle) }
                />  
             <Text>Du er {toggle ? 'snill' : 'ikke snill'} </Text>
        </View> 
    )
}

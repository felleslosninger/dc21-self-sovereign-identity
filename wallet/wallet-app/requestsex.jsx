import React, { useEffect, useState } from "react";
import { View, Text, Button} from 'react-native';

export default function TheRequests(){
    let url='http://localhost:8083/api/getCredential/';
    let statement = "123hei";
    
    const [text, setText] = useState("Hent bevis først.");

    async function sendRequest() {
        /*const requestOptions = {
            method: 'GET',
            headers: {'Conent-Type': 'text/html',
                    "access-control-allow-origin" : "*"},
    };*/
    let response = await fetch(url + statement);//, requestOptions);
    let payload = await response.text();
    console.log(payload);
    setText(payload);
   
    };

    return (
        <View>
            <Button 
            title="Få bevis av issuer" 
            onPress={() =>sendRequest()}>
            </Button>
            <Text>
                {text}
            </Text>
        </View>
    );
}

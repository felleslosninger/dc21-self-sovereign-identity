import React, { useEffect, useState } from "react";
import { View, Text, Button} from 'react-native';

export default function TheRequests(){
    let url='/api/getCredential/'
    const [response, setResponse] = useState('123');
    const [statement, setStatement] = useState('123hei');

    async function sendRequest() {
        const requestOptions = {
            method: 'GET',
            headers: {'Conent-Type': 'text/html',
                    "access-control-allow-origin" : "*"},
            /*body: JSON.stringify({value: statement})*/
    };
    let response = await fetch(url + statement, requestOptions);
    console.log(response)
    let parsedResponse = JSON.parse(response);
    JSON.stringify
    setResponse('456');

    };

    return (
        <View>
            <Button 
            title="Få bevis av issuer" 
            onPress={() =>sendRequest()}>
            </Button>
            <Text>
                {response}
            </Text>
        </View>
    );
}

import React from "react";
import {ErrorHandlerCallback, Fetch, Error} from "react-native";
const sendCert = async () => {

    try{
        let response = await fetch(
            'http://localhost:8080'
        );
        let json = await response.json();
        return json.cert;
    }catch (error){
        console.error(error)
    }


};
 
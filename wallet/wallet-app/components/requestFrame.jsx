import React, {useState} from "react";

import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {Picker} from "@react-native-picker/picker";

export default function requestFrame(){

    const [selectedValue, setSelectedValue] = useState("ntnu");
    const [text, onChangeText] = useState(null);
    
    const onPress = () => alert("Pressed button");
    
    const styles = StyleSheet.create({
        container: {
            flex: 1, 
            marginTop: '18%',
        },
        title: {
            fontSize: 30,
            alignSelf: 'center',
            marginBottom: 13, 
        },
        issuer: {
            marginTop: '1%',
        },
        text: {
            fontSize: 25,
            marginLeft: 30,
        },
        picker: {
            width: '80%',
            alignSelf: 'center',
        },
        input: {
            borderColor: '#add8e6',
            borderWidth: 2,
            borderRadius: 2,
            width: '80%',
            alignSelf: 'center',
        },
        proof: {
            marginTop: '3%',
        },
        button: {
            marginTop: '5%',
            backgroundColor: '#add8e6',
            alignItems: 'center',
            borderRadius: 5,
            width: '80%',
            alignSelf: 'center',
        },
        buttonText: {
            fontSize: 20,
        }
    });

    return(
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.title}>Forespørsel om nytt bevis </Text>

            <SafeAreaView style = {styles.issuer}>
                <Text style = {styles.text}>Velg utsteder </Text>
                
                <Picker
                    selectedValue = {selectedValue}
                    style = {styles.picker}
                    onValueChange = {(itemValue) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label = "NTNU" value = "ntnu" />
                    <Picker.Item label = "Statens Vegvesen" value = "sv" />
                    <Picker.Item label = "Folkeregisteret" value = "fr" />
                </Picker>

            </SafeAreaView>

            <SafeAreaView style = {styles.proof}>
                <Text style = {styles.text}>Ønsket bevis</Text>
                <TextInput
                    style = {styles.input}
                    onChangeText={onChangeText}
                    value = {text}
                    placeholder = 'Bevis'
                >
                </TextInput>
            </SafeAreaView>

            <TouchableOpacity onPress= {onPress}>
                <SafeAreaView style = {styles.button}>
                    <Text style = {styles.buttonText}>Send forespørsel</Text>
                </SafeAreaView>
            </TouchableOpacity>
        </SafeAreaView>
    );

}

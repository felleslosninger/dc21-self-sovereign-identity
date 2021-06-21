import React from "react";
import { View, Text, StyleSheet, Button, Alert,TouchableOpacity} from "react-native";

const Separator = () => (
    <View style={styleSheets.separator} />
);

export default function MenuButtons() {
    
    const click = () => alert('Pressed')

    return(
    <View style={styles.container}>
       

    <TouchableOpacity
            style={styles.button}
            onPress={click}>
            <Text>Oversikt</Text>

      </TouchableOpacity>
      <TouchableOpacity
            style={styles.buttonTo}
            onPress={click}>
            <Text>Forespørsler</Text>

      </TouchableOpacity>
      <TouchableOpacity
            style={styles.buttonTre}
            onPress={click}>
            <Text>Etterspørsel</Text>

      </TouchableOpacity>

    </View>
        
    );}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        
    },
    button: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        backgroundColor: "#CDE6EA",
        padding: 10,
        width:100,
        hight:100,
        
    },
    buttonTo: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#CDE6EA",
        padding: 10,
        width:100,
        hight:100

    },
    buttonTre: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'flex-end',
        backgroundColor: "#CDE6EA",
        padding: 10,
        width:100,
        hight:100
    }


    
    });
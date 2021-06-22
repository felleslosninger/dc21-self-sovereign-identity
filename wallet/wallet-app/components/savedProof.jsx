import React from "react";

import { SafeAreaView, Text, FlatList, StyleSheet } from "react-native";

export default function savedProof(){

    const proofs = [
        {
            id: Math.random().toString(), 
            proof: "over-18",
        }, 
        {
            id: Math.random().toString(), 
            proof: "er-sykepleier",
        },
    ];

    const styles = StyleSheet.create({
        container: {
            flex: 1, 
            marginTop: '12%',
        },
        item: {
            backgroundColor: 'lightgrey',
            padding: 10, 
            fontSize: 20, 
            marginVertical: 3,
            marginHorizontal: 16,
            borderRadius: 4,
            alingItems: 'center',
        }
    });

    return(
        <SafeAreaView style = {styles.container}>
            <FlatList
                keyExtractor = {item => item.id}
                data = {proofs}
                renderItem = {({ item }) => (
                    <Text style={styles.item}> {item.proof}</Text>
                )}
            />
        </SafeAreaView>
    );


}
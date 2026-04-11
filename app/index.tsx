import { StyleSheet, Text, View, Image } from "react-native";
import { useRouter } from "expo-router"; 
import { useEffect } from "react"; 
import { StatusBar } from "expo-status-bar"; 
import { Stack } from "expo-router" 
import React from "react";

const Colors = {
    FundoEscuro: "#000000",        
    DestaqueFIAP: "#F23064",    
};

export default function Index() {
    const router = useRouter(); 

    
useEffect(() => {
    const timer = setTimeout(() => {
          router.replace("/login"); 
    }, 5000); 

        return () => clearTimeout(timer);
     }, []);

    
    return (

        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={Styles.container}>
                <Image
                    source={require("../assets/images/MaskGrup.png")} 
                    style={Styles.logo}
                />
                
                <Text style={Styles.text}>Fiap Connect</Text>
                
                <StatusBar style="light" /> 
            </View>
        </>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: Colors.FundoEscuro, 
        justifyContent: "center", 
        alignItems: "center",
    },
    logo: {
        width: 300, 
        height:200,
        marginBottom: 20, 
    },
    text: {
        color: Colors.DestaqueFIAP, 
        fontSize: 50, 
        fontWeight: "500",
        marginTop: -50,
        marginLeft: -0,
    },
});
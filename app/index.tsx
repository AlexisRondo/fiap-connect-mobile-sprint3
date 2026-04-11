import { StyleSheet, Text, View, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useAuth } from "../src/contexts/AuthContext";

export default function Index() {
    const router = useRouter();
    const { user, loading } = useAuth();

    // Aguarda o Firebase verificar a sessao e redireciona
    useEffect(() => {
        if (loading) return;

        const timer = setTimeout(() => {
            if (user) {
                // Usuario ja logado, vai direto pro dashboard
                router.replace("/dashboard");
            } else {
                // Sem sessao ativa, vai pro login
                router.replace("/login");
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [loading, user]);

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/MaskGrup.png")}
                style={styles.logo}
            />
            <Text style={styles.text}>Fiap Connect</Text>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 300,
        height: 200,
        marginBottom: 20,
    },
    text: {
        color: '#F23064',
        fontSize: 50,
        fontWeight: "500",
        marginTop: -50,
    },
});
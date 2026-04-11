import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../src/contexts/ThemeContext";

export default function InvitesPage() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.FundoPrincipal }]}
    >
      <Text style={[styles.title, { color: colors.TextoPrincipal }]}>
        Convites
      </Text>
      <Text style={[styles.subtitle, { color: colors.TextoSecundario }]}>
        Voce ainda nao tem nenhum convite.
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.DestaqueFIAP }]}
        onPress={() => router.push("/dashboard")}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    marginBottom: 40,
    fontSize: 15,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

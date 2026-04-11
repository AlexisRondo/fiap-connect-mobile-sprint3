import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Colors = {
  FundoEscuro: '#000000',
  TextoClaro: '#FFFFFF',
  CardFundo: '#1A1A1A',
  DestaqueFIAP: '#F23064',
};

export default function InvitesPage() {
  const router = useRouter();   

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Convites</Text>
      <Text style={styles.subtitle}>Você ainda nao tem nenhum convite.</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/dashboard')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.FundoEscuro,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: Colors.TextoClaro,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    color: Colors.TextoClaro,
    opacity: 0.8,
    marginBottom: 40,
  },
  button: {
    backgroundColor: Colors.DestaqueFIAP,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.TextoClaro,
    fontWeight: 'bold',
  },
});

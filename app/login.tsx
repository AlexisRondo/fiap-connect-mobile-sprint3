import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { useTheme } from '../src/contexts/ThemeContext';

export default function LoginPage() {
  const { login, cadastrar } = useAuth();
  const { colors } = useTheme();
  const [rm, setRm] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [modoLogin, setModoLogin] = useState(true);

  const montarEmail = (rmInput: string): string => {
    const rmLimpo = rmInput.trim().toLowerCase();
    if (rmLimpo.includes('@')) return rmLimpo;
    return `${rmLimpo}@fiap.com.br`;
  };

  const handleSubmit = async () => {
    if (rm.trim().length < 4) {
      Alert.alert('Erro', 'Insira um RM valido.');
      return;
    }
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no minimo 6 caracteres.');
      return;
    }

    setCarregando(true);
    try {
      const email = montarEmail(rm);
      if (modoLogin) {
        await login(email, senha);
      } else {
        await cadastrar(email, senha);
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
      }
    } catch (error: any) {
      let mensagem = 'Erro desconhecido.';
      if (error.code === 'auth/user-not-found') mensagem = 'Usuario nao encontrado.';
      else if (error.code === 'auth/wrong-password') mensagem = 'Senha incorreta.';
      else if (error.code === 'auth/invalid-credential') mensagem = 'RM ou senha incorretos.';
      else if (error.code === 'auth/email-already-in-use') mensagem = 'Este RM ja possui conta.';
      else if (error.code === 'auth/invalid-email') mensagem = 'RM invalido.';
      Alert.alert('Erro', mensagem);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <ImageBackground
        source={require('../assets/images/background-login.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>
              {modoLogin ? 'Acesso FIAP Connect' : 'Criar Conta'}
            </Text>

            <Text style={styles.label}>RM:</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ex: RM560384"
                placeholderTextColor="#FFFFFF80"
                autoCapitalize="none"
                value={rm}
                onChangeText={setRm}
              />
            </View>

            <Text style={styles.label}>Senha:</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Minimo 6 caracteres"
                placeholderTextColor="#FFFFFF80"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, carregando && { opacity: 0.7 }]}
              onPress={handleSubmit}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>
                  {modoLogin ? 'Conectar' : 'Cadastrar'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchMode}
              onPress={() => setModoLogin(!modoLogin)}
            >
              <Text style={styles.switchText}>
                {modoLogin
                  ? 'Nao tem conta? Cadastre-se'
                  : 'Ja tem conta? Faca login'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '85%',
    padding: 20,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    color: '#F23064',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 15,
    marginBottom: 5,
    fontWeight: '600',
  },
  inputWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F23064',
    height: 50,
    justifyContent: 'center',
  },
  input: {
    color: '#FFFFFF',
    paddingHorizontal: 15,
    fontSize: 16,
    flex: 1,
  },
  button: {
    backgroundColor: '#F23064',
    borderRadius: 8,
    padding: 15,
    marginTop: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchMode: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#FFFFFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ImageBackground, // Componente ImageBackground
    KeyboardAvoidingView, // Adicionado para melhor UX
    Platform,
    SafeAreaView, // Adicionado para consistência de layout
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from "expo-router"; 


const Colors = {
    
    FundoEscuro: '#000000',
    DestaqueFIAP: '#F23064', 
    TextoClaro: '#FFFFFF',
    InputFundo: 'rgba(255, 255, 255, 0.1)',
};

export default function LoginPage() {
    const router = useRouter();
    const [rm, setRm] = useState('');
    const [senha, setSenha] = useState('');
  
    const handleLogin = () => {
        if (rm.length > 3) {
            console.log('Login simulado com RM:', rm);
            router.replace("/dashboard"); 
        } else {
            alert('Por favor, insira um RM válido para continuar.');
        }
    };

    return (
        <SafeAreaView style={Styles.fullScreen}>
            <ImageBackground 
                source={require('../assets/images/background-login.png')} 
                style={Styles.background} 
                resizeMode="cover" 
            >
                <KeyboardAvoidingView 
                    style={Styles.overlay}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    {/* Container do Formulário */}
                    <View style={Styles.formContainer}>
                      
                        <Text style={Styles.title}>Acesso FIAP Connect</Text>

                        {/* Campo de RM (Usuário) */}
                        <Text style={Styles.label}>RM:</Text>
                        <View style={Styles.inputWrapper}>
                            <TextInput
                                style={Styles.input}
                                placeholder="Seu RM ou E-mail"
                                placeholderTextColor={Colors.TextoClaro + '80'}
                                keyboardType="email-address"
                                value={rm}
                                onChangeText={setRm} 
                            />
                        </View>
                      
                        {/* Campo de Senha */}
                        <Text style={Styles.label}>Senha:</Text>
                        <View style={Styles.inputWrapper}>
                            <TextInput
                                style={Styles.input}
                                placeholder="••••••••"
                                placeholderTextColor={Colors.TextoClaro + '80'}
                                secureTextEntry={true} 
                                value={senha}
                                onChangeText={setSenha}
                            />
                        </View>
                      
                        {/* Botão Conectar */}
                        <TouchableOpacity style={Styles.button} onPress={handleLogin}>
                            <Text style={Styles.buttonText}>Conectar</Text>
                        </TouchableOpacity>

                        {/* Preview dos dados digitados  */}
                        <View style={Styles.previewContainer}>
                            <Text style={Styles.previewTitle}>Preview (Dev Mode):</Text>
                            <Text style={Styles.previewText}>RM Digitado: {rm}</Text>
                            <Text style={Styles.previewText}>Senha: {senha.length} caracteres</Text>
                        </View>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: Colors.FundoEscuro,
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
        fontSize: 28, // Aumentado
        color: Colors.DestaqueFIAP,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 50,
    },
    label: {
        fontSize: 18,
        color: Colors.TextoClaro, 
        marginTop: 15,
        marginBottom: 5,
        fontWeight: '600',
    },
    inputWrapper: {
        backgroundColor: Colors.InputFundo,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.DestaqueFIAP, 
        height: 50,
        justifyContent: 'center',
    },
    input: {
        color: Colors.TextoClaro,
        paddingHorizontal: 15,
        fontSize: 16,
        flex: 1,
    },
    button: {
        backgroundColor: Colors.DestaqueFIAP,
        borderRadius: 8,
        padding: 15,
        marginTop: 40,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.TextoClaro,
        fontSize: 18,
        fontWeight: 'bold',
    },
    previewContainer: {
        marginTop: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.TextoClaro + '40',
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    },
    previewTitle: {
        color: Colors.DestaqueFIAP,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    previewText: {
        color: Colors.TextoClaro,
        fontSize: 14,
    },
});
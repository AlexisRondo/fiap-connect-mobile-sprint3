import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router'; 
import React from 'react';

// Paleta de Cores da FIAP
const Colors = {
    FundoEscuro: '#000000',
    DestaqueFIAP: '#F23064', 
    TextoClaro: '#FFFFFF',
    TextoNeutro: '#8C8C8C',
    CardFundo: '#1A1A1A', 
};

//  Componente Reutilizável de Item de Menu 
interface MenuItemProps {
    iconSource: any;
    title: string;
    onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ iconSource, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <Image source={iconSource} style={styles.menuIcon} resizeMode="contain" />
        <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
);

// Definição de todas as rotas válidas do app
type AppRoutes = 
    | "accountsettingspage"
    | "chat"
    | "dashboard"
    | "profilepage"
    | "skillssetuppage"
    | "invites"
    // Componente Principal da Página 
export default function ProfilePage() {
    const router = useRouter(); 
    const userName = "Gabriel Gonçalves";
    const userEmail = "RM561029@fiap.com";

    
    const handleNavigation = (destination: AppRoutes) => {
        router.push(`/${destination}` as never); 
    };
    
    const goBack = () => {
        router.replace('/dashboard');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                {/* Botão Voltar */}
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Text style={styles.backText}>{'< Voltar'}</Text>
                </TouchableOpacity>

                {/* Bloco do Perfil */}
                <View style={styles.profileCard}> 
                    {/* Foto de Perfil */}
                    <View style={styles.profileImageContainer}>
                        <Image source={require('../assets/images/eu2.jpg')} style={styles.profileImage} />
                        <TouchableOpacity style={styles.cameraIconContainer}>
                            <Image source={require('../assets/images/camera.png')} 
                                        style={styles.cameraIcon} 
                                        resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    {/* Dados Básicos */}
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.userEmail}>{userEmail}</Text>

                    {/* Divisor */}
                    <View style={styles.divider} />

                    {/* Menu de Opções */}
                    <MenuItem 
                        iconSource={require('../assets/images/perfil.png')} 
                        title="Conta" 
                        onPress={() => handleNavigation('accountsettingspage')} 
                    />
                    
                    <MenuItem 
                        iconSource={require('../assets/images/compentencias.png')} 
                        title="Competências para o Matchmaking" 
                        onPress={() => handleNavigation('skillssetuppage')} 
                    />
                    
                </View>
                
                {/* Espaçador */}
                <View style={{ height: 80 }} /> {/* Reduzido de 100 para 80 */}
            </ScrollView>

            {/* Rodapé */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Connect Fiap</Text>
                <Image source={require('../assets/images/link.png')} 
                    style={styles.footerIcon} 
                    resizeMode="contain" />
                <Image source={require('../assets/images/Oracle.png')} 
                    style={styles.footerIcon} 
                    resizeMode="contain" />
                <Image source={require('../assets/images/git.png')} 
                    style={styles.footerIcon} 
                    resizeMode="contain" />
                <Text style={styles.footerText}>FIAP</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.FundoEscuro,
    },
    container: { 
        flex: 1,
        backgroundColor: Colors.FundoEscuro,
        paddingTop: 8, 
    },
    
    // --- Botão Voltar ---
    backButton: {
        paddingHorizontal: 20, 
        paddingVertical: 8, 
        marginBottom: 8, 
    },
    backText: {
        color: Colors.TextoClaro,
        fontSize: 14, 
        fontWeight: '600',
    },

    // --- Bloco do Perfil ---
    profileCard: {
        backgroundColor: Colors.CardFundo,
        marginHorizontal: 16, 
        borderRadius: 12, 
        padding: 16, 
        alignItems: 'center',
        marginBottom: 8, 
    },
    profileImageContainer: {
        marginBottom: 4,
        alignItems: 'center',
    },
    profileImage: {
        width: 150, 
        height: 150, 
        borderRadius: 75,
        marginBottom: 4,
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 10, 
        right: 10, 
        backgroundColor: Colors.DestaqueFIAP,
        borderRadius: 20, 
        width: 30, 
        height: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.TextoClaro,
    },
    cameraIcon: {
        width: 15, 
        height: 15, 
        bottom: 0, 
    },
    userName: {
        fontSize: 18, 
        fontWeight: 'bold',
        color: Colors.TextoClaro,
    },
    userEmail: {
        fontSize: 13, 
        color: Colors.TextoNeutro,
        marginBottom: 8, 
    },
    divider: {
        height: 1,
        backgroundColor: Colors.DestaqueFIAP,
        width: '90%',
        marginVertical: 16, 
    },

    // --- Itens de Menu ---
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 50, 
        borderBottomWidth: 0.5,
        borderColor: Colors.TextoNeutro + '30',
    },
    menuIcon: {
        width: 30, 
        height: 30, 
        marginRight: 12, 
        tintColor: Colors.DestaqueFIAP,
    },
    menuText: {
        fontSize: 16, 
        color: Colors.TextoClaro,
        fontWeight: '600',
    },

    // --- Rodapé ---
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 17, 
        backgroundColor: Colors.FundoEscuro,
        borderTopWidth: 1,
        borderColor: Colors.DestaqueFIAP,
    },
    footerIcon: {
        width: 20, 
        height: 20, 
        tintColor: Colors.DestaqueFIAP, 
    },
    footerText: {
        color: Colors.TextoNeutro,
        fontSize: 11, 
    },
}); 
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { useTheme } from '../src/contexts/ThemeContext';

interface MenuItemProps {
    iconSource: any;
    title: string;
    onPress: () => void;
    colors: any;
}

const MenuItem: React.FC<MenuItemProps> = ({ iconSource, title, onPress, colors }) => (
    <TouchableOpacity style={[styles.menuItem, { borderColor: colors.TextoSecundario + '30' }]} onPress={onPress}>
        <Image source={iconSource} style={[styles.menuIcon, { tintColor: colors.DestaqueFIAP }]} resizeMode="contain" />
        <Text style={[styles.menuText, { color: colors.TextoPrincipal }]}>{title}</Text>
    </TouchableOpacity>
);

export default function ProfilePage() {
    const router = useRouter();
    const { user, getRm, logout } = useAuth();
    const { colors, isDark, toggleTheme } = useTheme();

    const userName = getRm() || 'Aluno';
    const userEmail = user?.email || 'email@fiap.com.br';

    const goBack = () => {
        router.replace('/dashboard');
    };

    const handleLogout = async () => {
        await logout();
        router.replace('/login');
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.FundoPrincipal }]}>
            <ScrollView style={[styles.container, { backgroundColor: colors.FundoPrincipal }]}>
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Text style={[styles.backText, { color: colors.TextoPrincipal }]}>{'< Voltar'}</Text>
                </TouchableOpacity>

                <View style={[styles.profileCard, { backgroundColor: colors.FundoCard }]}>
                    <View style={styles.profileImageContainer}>
                        <View style={[styles.profileImagePlaceholder, { backgroundColor: colors.DestaqueFIAP + '20' }]}>
                            <Text style={{ fontSize: 50 }}>👤</Text>
                        </View>
                    </View>

                    <Text style={[styles.userName, { color: colors.TextoPrincipal }]}>{userName}</Text>
                    <Text style={[styles.userEmail, { color: colors.TextoSecundario }]}>{userEmail}</Text>

                    <View style={[styles.divider, { backgroundColor: colors.DestaqueFIAP }]} />

                    <MenuItem
                        iconSource={require('../assets/images/perfil.png')}
                        title="Conta"
                        onPress={() => router.push('/accountsettingspage')}
                        colors={colors}
                    />

                    <MenuItem
                        iconSource={require('../assets/images/compentencias.png')}
                        title="Competencias para o Matchmaking"
                        onPress={() => router.push('/skillssetuppage')}
                        colors={colors}
                    />

                    <TouchableOpacity
                        style={[styles.themeToggle, { borderColor: colors.TextoSecundario + '30' }]}
                        onPress={toggleTheme}
                    >
                        <Text style={{ fontSize: 22 }}>{isDark ? '☀️' : '🌙'}</Text>
                        <Text style={[styles.menuText, { color: colors.TextoPrincipal }]}>
                            {isDark ? 'Modo Claro' : 'Modo Escuro'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Sair da Conta</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 80 }} />
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: colors.FundoPrincipal, borderColor: colors.DestaqueFIAP }]}>
                <TouchableOpacity onPress={() => router.replace('/searchpage')} style={styles.footerItem}>
                    <Image source={require('../assets/images/MaskGrup.png')} style={[styles.footerIcon, { tintColor: colors.TextoSecundario }]} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace('/conversations')} style={styles.footerItem}>
                    <Image source={require('../assets/images/mensagem.png')} style={[styles.footerIcon, { tintColor: colors.TextoSecundario }]} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace('/profilepage')} style={styles.footerItem}>
                    <Image source={require('../assets/images/perfil.png')} style={[styles.footerIcon, { tintColor: colors.DestaqueFIAP }]} resizeMode="contain" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingTop: 8,
    },
    backButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginBottom: 8,
    },
    backText: {
        fontSize: 14,
        fontWeight: '600',
    },
    profileCard: {
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
    profileImagePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 13,
        marginBottom: 8,
    },
    divider: {
        height: 1,
        width: '90%',
        marginVertical: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 20,
        borderBottomWidth: 0.5,
    },
    menuIcon: {
        width: 30,
        height: 30,
        marginRight: 12,
    },
    menuText: {
        fontSize: 16,
        fontWeight: '600',
    },
    themeToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        gap: 12,
    },
    logoutButton: {
        borderWidth: 1,
        borderColor: '#F23064',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    logoutText: {
        color: '#F23064',
        fontWeight: 'bold',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 17,
        borderTopWidth: 1,
    },
    footerItem: {
        padding: 10,
    },
    footerIcon: {
        width: 22,
        height: 22,
    },
});
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { useTheme } from '../src/contexts/ThemeContext';
import { buscarUsuario, Usuario } from '../src/services/apexApi';

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

    // Dados reais do banco
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [carregando, setCarregando] = useState(true);

    // Busca dados completos do usuario logado no Oracle
    useEffect(() => {
        const carregar = async () => {
            const rm = getRm();
            if (!rm) {
                setCarregando(false);
                return;
            }
            try {
                const dados = await buscarUsuario(rm);
                setUsuario(dados);
            } catch (error) {
                console.log('Erro ao buscar usuario:', error);
            } finally {
                setCarregando(false);
            }
        };
        carregar();
    }, []);

    // Fallback caso ainda nao carregou ou deu erro - usa dados do firebase
    const userName = usuario?.nome_completo || getRm() || 'Aluno';
    const userEmail = usuario?.email_institucional || user?.email || 'email@fiap.com.br';
    const userTelefone = usuario?.telefone || '';
    const userBio = usuario?.bio || '';
    const userRm = usuario?.rm || getRm() || '';

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

                    {carregando ? (
                        <ActivityIndicator size="small" color={colors.DestaqueFIAP} style={{ marginVertical: 8 }} />
                    ) : (
                        <>
                            <Text style={[styles.userName, { color: colors.TextoPrincipal }]}>{userName}</Text>
                            <Text style={[styles.userRm, { color: colors.DestaqueFIAP }]}>{userRm}</Text>
                            <Text style={[styles.userEmail, { color: colors.TextoSecundario }]}>{userEmail}</Text>

                            {userTelefone ? (
                                <Text style={[styles.userInfo, { color: colors.TextoSecundario }]}>📞 {userTelefone}</Text>
                            ) : null}

                            {userBio ? (
                                <Text style={[styles.userBio, { color: colors.TextoPrincipal }]}>{userBio}</Text>
                            ) : null}

                            {usuario && (
                                <View style={styles.tagsRow}>
                                    <View style={[styles.tag, { backgroundColor: colors.DestaqueFIAP + '20' }]}>
                                        <Text style={[styles.tagText, { color: colors.DestaqueFIAP }]}>{usuario.curso}</Text>
                                    </View>
                                    <View style={[styles.tag, { backgroundColor: colors.DestaqueFIAP + '20' }]}>
                                        <Text style={[styles.tagText, { color: colors.DestaqueFIAP }]}>{usuario.periodo}</Text>
                                    </View>
                                    <View style={[styles.tag, { backgroundColor: colors.DestaqueFIAP + '20' }]}>
                                        <Text style={[styles.tagText, { color: colors.DestaqueFIAP }]}>{usuario.unidade}</Text>
                                    </View>
                                </View>
                            )}
                        </>
                    )}

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
    safeArea: { flex: 1 },
    container: { flex: 1, paddingTop: 40 },
    backButton: { paddingHorizontal: 20, paddingVertical: 8, marginBottom: 8 },
    backText: { fontSize: 14, fontWeight: '600' },
    profileCard: {
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 8,
    },
    profileImageContainer: { marginBottom: 4, alignItems: 'center' },
    profileImagePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    userName: { fontSize: 18, fontWeight: 'bold' },
    userRm: { fontSize: 13, fontWeight: '600', marginTop: 2 },
    userEmail: { fontSize: 13, marginBottom: 6, marginTop: 2 },
    userInfo: { fontSize: 13, marginTop: 4 },
    userBio: {
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
        fontStyle: 'italic',
        paddingHorizontal: 10,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 12,
        gap: 6,
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    tagText: { fontSize: 11, fontWeight: '700' },
    divider: { height: 1, width: '90%', marginVertical: 16 },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 20,
        borderBottomWidth: 0.5,
    },
    menuIcon: { width: 30, height: 30, marginRight: 12 },
    menuText: { fontSize: 16, fontWeight: '600' },
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
    logoutText: { color: '#F23064', fontWeight: 'bold', fontSize: 16 },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 17,
        borderTopWidth: 1,
    },
    footerItem: { padding: 10 },
    footerIcon: { width: 22, height: 22 },
});
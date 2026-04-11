import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';
import { useTheme } from '../src/contexts/ThemeContext';

export default function DashboardPage() {
    const router = useRouter();
    const { user, logout, getRm } = useAuth();
    const { colors, isDark, toggleTheme } = useTheme();

    const userName = getRm() || 'Aluno';
    const hasNewInvite = true;
    const isGroupFormed = false;

    type Destination =
      | 'searchpage'
      | 'profilepage'
      | 'invites'
      | 'conversations'
      | 'accountsettingspage'
      | 'login';

    const handleNavigation = (destination: Destination) => {
        router.push((`/${destination}` as unknown) as Parameters<typeof router.push>[0]);
    };

    const handleLogout = async () => {
        await logout();
        router.replace('/login');
    };

    const headerPaddingTop = Platform.OS === 'ios' ? 50 : 20;

    return (
        <SafeAreaView style={[styles.fullContainer, { backgroundColor: colors.FundoPrincipal }]}>
            <ScrollView style={styles.contentContainer} contentContainerStyle={{ flexGrow: 1, paddingBottom: 110 }}>

                <View style={[styles.header, { paddingTop: headerPaddingTop, backgroundColor: colors.FundoPrincipal, borderColor: colors.DestaqueFIAP }]}>
                    <View>
                        <Text style={[styles.greeting, { color: colors.TextoPrincipal }]}>Ola, {userName}!</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
                            <Text style={{ fontSize: 22 }}>{isDark ? '☀️' : '🌙'}</Text>
                        </TouchableOpacity>
                        <Image
                            source={require('../assets/images/header-dashboard.png')}
                            style={styles.headerImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.TextoPrincipal }]}>Acesso Rapido</Text>
                    <View style={styles.quickAccessRow}>
                        <View style={[styles.quickCard, { backgroundColor: colors.FundoCard, borderColor: colors.DestaqueFIAP + '80' }]}>
                            <Text style={[styles.cardTitle, { color: colors.TextoPrincipal }]}>Procurando um Time?</Text>
                            <Text style={[styles.cardSubtitle, { color: colors.TextoSecundario }]}>Encontre seu Match Ideal!</Text>
                            <TouchableOpacity
                                style={[styles.cardButton, { backgroundColor: colors.DestaqueFIAP }]}
                                onPress={() => handleNavigation('searchpage')}
                            >
                                <Text style={styles.buttonText}>Comecar a Buscar</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.quickCard, { backgroundColor: colors.FundoCard, borderColor: colors.DestaqueFIAP + '80' }]}>
                            <Text style={[styles.cardTitle, { color: colors.TextoPrincipal }]}>
                                {hasNewInvite ? 'Voce tem 1 Novo Convite!' : 'Nenhum Convite Novo'}
                            </Text>
                            <Text style={[styles.cardSubtitle, { color: colors.TextoSecundario }]}>
                                {hasNewInvite ? 'Nao perca tempo!' : 'Seja proativo.'}
                            </Text>
                            <TouchableOpacity
                                style={[styles.cardButton, { backgroundColor: hasNewInvite ? colors.DestaqueFIAP : colors.TextoSecundario }]}
                                onPress={() => handleNavigation(hasNewInvite ? 'invites' : 'profilepage')}
                            >
                                <Text style={styles.buttonText}>{hasNewInvite ? 'Ver Convite' : 'Ver Perfil'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.TextoPrincipal }]}>Notificacoes</Text>
                    {isGroupFormed ? (
                        <View style={[styles.notificationCard, { backgroundColor: colors.FundoCard, borderColor: colors.DestaqueFIAP }]}>
                            <Text style={[styles.notificationText, { color: colors.TextoPrincipal }]}>Parabens! Seu Grupo esta Formado!</Text>
                            <TouchableOpacity
                                style={[styles.notificationButton, { backgroundColor: colors.DestaqueFIAP }]}
                                onPress={() => router.push("/grupos/groupdetailspage")}
                            >
                                <Text style={styles.buttonText}>Ver Detalhes do Grupo</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={[styles.notificationCard, { backgroundColor: colors.FundoCard, borderColor: colors.DestaqueFIAP }]}>
                            <Text style={[styles.notificationText, { color: colors.TextoPrincipal }]}>Voce ainda nao esta em um grupo.</Text>
                            <TouchableOpacity
                                style={[styles.notificationButton, { backgroundColor: colors.DestaqueFIAP }]}
                                onPress={() => handleNavigation('searchpage')}
                            >
                                <Text style={styles.buttonText}>Buscar Grupo</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Sair da Conta</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 50 }} />

            </ScrollView>

            <View style={[styles.tabBar, { backgroundColor: colors.TabBar, borderColor: colors.DestaqueFIAP }]}>
                <TouchableOpacity onPress={() => handleNavigation('searchpage')} style={styles.tabItem}>
                    <Image
                        source={require('../assets/images/MaskGrup.png')}
                        style={[styles.tabIconImage, { tintColor: colors.DestaqueFIAP }]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleNavigation('conversations')} style={styles.tabItem}>
                    <Image
                        source={require('../assets/images/mensagem.png')}
                        style={[styles.tabIconImage, { tintColor: colors.TextoSecundario }]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleNavigation('profilepage')} style={styles.tabItem}>
                    <Image
                        source={require('../assets/images/perfil.png')}
                        style={[styles.tabIconImage, { tintColor: colors.TextoSecundario }]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fullContainer: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    themeButton: {
        padding: 8,
    },
    greeting: {
        fontSize: 30,
        fontWeight: 'bold',
        width: 200,
    },
    headerImage: {
        width: 100,
        height: 80,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    quickAccessRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    quickCard: {
        width: '48%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardSubtitle: {
        fontSize: 14,
        marginBottom: 5,
    },
    cardButton: {
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    notificationCard: {
        padding: 25,
        borderRadius: 10,
        borderLeftWidth: 5,
    },
    notificationText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    notificationButton: {
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        width: '100%',
    },
    logoutButton: {
        borderWidth: 1,
        borderColor: '#F23064',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
    },
    logoutText: {
        color: '#F23064',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        borderTopWidth: 2,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    },
    tabItem: {
        padding: 10,
    },
    tabIconImage: {
        width: 28,
        height: 28,
    },
});
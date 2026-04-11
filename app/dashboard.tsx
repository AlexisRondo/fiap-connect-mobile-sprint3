import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'; 

const Colors = {
    FundoEscuro: '#000000',
    DestaqueFIAP: '#F23064', 
    TextoClaro: '#FFFFFF',
    TextoNeutro: '#8C8C8C',
    CardFundo: '#1A1A1A', 
};

// --- Dados Simulados ---
const userName = "Gabriel";
const hasNewInvite = true;
const isGroupFormed = true; 


    // Componente para os cartões de Acesso Rápido 
interface QuickAccessCardProps {
    title: string;
    subtitle?: string;
    buttonText?: string;
    onPress?: () => void;
    color?: string;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ title, subtitle, buttonText = 'Abrir', onPress, color }) => (
    <View style={styles.quickCard}>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}
        <TouchableOpacity 
            style={[styles.cardButton, { backgroundColor: color || Colors.DestaqueFIAP }]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    </View>
);

// Componente Principal (Dashboard)  

export default function DashboardPage() {
    const router = useRouter(); 
    
    // Tipagem segura para destinos conhecidos
    type Destination =
      | 'searchpage'
      | 'profilepage'
      | 'groupdetailspage'
      | 'invites'    
      | 'conversations'
      | 'accountsettingspage'
      | 'login'
      ;


    const handleNavigation = (destination: Destination) => {
        console.log(`Navegando para: ${destination}`);
        router.push((`/${destination}` as unknown) as Parameters<typeof router.push>[0]);
    };

    // ajuste dinâmico para o padding superior do header
    const headerPaddingTop = Platform.OS === 'ios' ? 50 : 20;

    return (
        <SafeAreaView style={styles.fullContainer}>
            <ScrollView style={styles.contentContainer} contentContainerStyle={{ flexGrow: 1, paddingBottom: 110 }}>

                {/* Área de Boas-Vindas (COM BOTÃO DE PERFIL) */}
                <View style={[styles.header, { paddingTop: headerPaddingTop }]}>
                    <Text style={styles.greeting}>Olá, {userName}!</Text>
                    
                    
                    <View style={styles.headerRight}>
                            {/* O gráfico/pessoas */}
                            <Image 
                                source={require('../assets/images/header-dashboard.png')} 
                                style={styles.headerImage} 
                                resizeMode="contain" 
                            />
                        </View>
                </View>

                {/* Cards Lado a Lado */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Acesso Rápido</Text>
                    <View style={styles.quickAccessRow}>
                        
                        {/* BUSCAR GRUPO */}
                        <QuickAccessCard
                            title="Procurando um Time?"
                            subtitle="Encontre seu Match Ideal!"
                            buttonText="Começar a Buscar"
                            onPress={() => handleNavigation('searchpage')} 
                            color={Colors.DestaqueFIAP}
                        />

                        {/* CONVITE / STATUS */}
                        <QuickAccessCard
                            title={hasNewInvite ? "Você tem 1 Novo Convite de Grupo!" : "Nenhum Convite Novo"}
                            subtitle={hasNewInvite ? "Não perca tempo!" : "Seja proativo."}
                            buttonText={hasNewInvite ? "Ver Convite" : "Ver Perfil"}
                            onPress={() => handleNavigation(hasNewInvite ? 'invites' : 'profilepage')} 
                            color={hasNewInvite ? Colors.DestaqueFIAP : Colors.TextoNeutro}
                        />
                    </View>
                </View>

                {/* Card Grande */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notificações</Text>
                    {isGroupFormed ? (
                        <View style={styles.notificationCard}>
                            <Text style={styles.notificationText}>Parabéns! Seu Grupo está Formado!</Text>
                            <TouchableOpacity
                                style={styles.notificationButton}
                                    onPress={() => router.push("/grupos/groupdetailspage")}
                                >
                                    <Text style={styles.buttonText}>Ver Detalhes do Grupo</Text>
                            </TouchableOpacity>

                        </View>
                    ) : (
                        <Text style={styles.cardSubtitle}>Nenhuma notificação importante por enquanto.</Text>
                    )}
                </View>
                
                <View style={{ height: 50 }} />
                
            </ScrollView>
            
            {/* Navegação Inferior */}
            <View style={[styles.tabBar, { bottom: 0, paddingBottom: Platform.OS === 'ios' ? 24 : 12 }] }>
                
                {/* GRUPOS/BUSCA */}
                <TouchableOpacity onPress={() => handleNavigation('searchpage')} style={styles.tabItem}>
                    <Image 
                        source={require('../assets/images/MaskGrup.png')} 
                        style={[styles.tabIconImage, { tintColor: Colors.DestaqueFIAP }]} 
                        resizeMode="contain" 
                    />
                </TouchableOpacity>

                {/* abre a lista de conversas */}
                <TouchableOpacity onPress={() => handleNavigation('conversations')} style={styles.tabItem}>
                    <Image 
                        source={require('../assets/images/mensagem.png')} 
                        style={styles.tabIconImage} 
                        resizeMode="contain" 
                    />
                </TouchableOpacity>
                
                {/* PERFIL CORRIGIDO */}
                <TouchableOpacity onPress={() => handleNavigation('profilepage')} style={styles.tabItem}>
                    <Image 
                        source={require('../assets/images/perfil.png')} 
                        style={styles.tabIconImage} 
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
        backgroundColor: Colors.FundoEscuro,
    },
    contentContainer: {
        flexGrow: 1,
    },
    
    //  HEADER ESTILOS 
    header: {
        backgroundColor: Colors.FundoEscuro, 
        paddingHorizontal: 20, 
        paddingTop: 10,
        paddingBottom: 10, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end', 
        borderBottomWidth: 1, 
        borderColor: Colors.DestaqueFIAP,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'relative',
    },
    greeting: {
        fontSize: 30, 
        fontWeight: 'bold',
        color: Colors.TextoClaro,
        width: '50%',
        marginBottom: 0, 
    },
    headerImage: {
        width: 150, 
        height: 100,
        marginBottom: -30, 
    },
    profileIconContainer: {
        position: 'absolute',
        top: -20,
        right: 0, 
        padding: 5,
        zIndex: 10,
    },
    profileHeaderIcon: {
        width: 35,
        height: 35,
        tintColor: Colors.DestaqueFIAP,
    },

    // SEÇÕES E CARDS 
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
        marginBottom: 20,
    },
    quickAccessRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    quickCard: {
        width: '48%', 
        backgroundColor: Colors.CardFundo,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.DestaqueFIAP + '80',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
        marginBottom: 20,
    },
    cardSubtitle: {
        fontSize:15,
        color: Colors.TextoNeutro,
        marginBottom: 5,
    },
    cardButton: {
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: Colors.TextoClaro,
        fontWeight: 'bold',
    },
    notificationCard: {
        backgroundColor: Colors.CardFundo,
        padding: 30,
        borderRadius: 10,
        borderLeftWidth: 5, 
        borderColor: Colors.DestaqueFIAP,
        alignItems: 'flex-start',
    },
    notificationText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.TextoClaro,
        marginBottom: 25,
    },
    notificationButton: {
        backgroundColor: Colors.DestaqueFIAP,
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        width: '100%', 
    },

    // TAB BAR ESTILOS
    tabBar: {
        flexDirection: 'row',
        //justifyContent: 'space-around',
        paddingVertical: 15,
        backgroundColor: Colors.CardFundo,
        borderTopWidth: 2,
        borderColor: Colors.DestaqueFIAP,
        position: 'absolute', 
        bottom: -40,
        left: 0,
        right: 0,
    },
    tabItem: {
        padding: 10,
    },
    tabIconImage: {
        width: 110,
        height: 30,
    },
});
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

// [IMPORTAÇÃO DE IMAGENS] - usar require() para compatibilidade com TypeScript
const FotoPerfil = require('../assets/images/eu2.jpg');
const CompetenciasIcon = require('../assets/images/compentencias.png');
const LinkedInIcon = require('../assets/images/link.png');
const OracleLogo = require('../assets/images/Oracle.png');
const GitLogo = require('../assets/images/git.png');

// Paleta de Cores da FIAP
const Colors = {
    FundoEscuro: '#000000',
    DestaqueFIAP: '#F23064', 
    TextoClaro: '#FFFFFF',
    TextoNeutro: '#8C8C8C',
    CardFundo: '#1A1A1A', 
    TagDefault: '#333333', // Fundo das tags não selecionadas
    TagBorder: '#555555',  // Borda sutil para tags
};

// Dados das matérias (skills) para renderização
const allSkills = [
    "Mobile Application Development",
    "Java Advanced",
    "Development with .NET",
    "Non-Relational Database",
    "DevOps Tools e Cloud Computing",
    "Liderança de Grupo", // (Comportamental)
    "Disruptive Architectures IoT, IOB e Generative IA",
    "Compliance, Quality Assurance e Tests",
];

// --- Componente Principal da Página ---

export default function SkillsSetupPage() {
    const router = useRouter(); 
    
    // [ESTADO] Estado para controlar as skills selecionadas
    // Usa um Set para armazenar IDs/nomes de forma eficiente
    const [selectedSkills, setSelectedSkills] = useState(new Set<string>());
    
    // [ESTADO] Estado para controlar o texto da descrição
    const [description, setDescription] = useState('');

    const userName = "Gabriel Gonçalves";
    
    // Lógica para Voltar: voltar para a página de perfil
    const goBack = () => {
        // Use push para manter histórico (evita comportamento inesperado de replace)
        router.push('/profilepage');
    };
    
    // Lógica CHAVE: Alternar a seleção da skill
    const toggleSkill = (skill: string) => {
        // Cria uma nova cópia do Set para garantir que o React detecte a mudança de estado
        const newSkills = new Set(selectedSkills);
        if (newSkills.has(skill)) {
            newSkills.delete(skill); // Desseleciona
        } else {
            newSkills.add(skill); // Seleciona
        }
        setSelectedSkills(newSkills);
    };

    // --- Renderização de Componentes Internos ---

    // Renderiza uma única tag/matéria
    const renderSkillTag = (skill: string) => {
        const isSelected = selectedSkills.has(skill);
        
        return (
            <TouchableOpacity 
                key={skill}
                style={[
                    styles.skillTag,
                    // Estilo Magenta se selecionado, Fundo Padrão se não
                    isSelected ? styles.skillTagSelected : styles.skillTagDefault
                ]}
                onPress={() => toggleSkill(skill)}
            >
                <Text style={styles.skillText}>{skill}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                
                {/* Botão Voltar */}
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Text style={styles.backText}>{'< Voltar'}</Text>
                </TouchableOpacity>

                {/* Bloco do Perfil (Foto e Nome) */}
                <View style={styles.profileHeader}>
                    <View style={styles.profileImageBorder}>
                        <Image source={FotoPerfil} style={styles.profileImage} />
                    </View>
                    <Text style={styles.userName}>{userName}</Text>
                </View>

                {/* Seção 1: COMPETÊNCIAS */}
                <View style={styles.sectionCard}>
                    <View style={styles.titleRow}>
                        <Image source={CompetenciasIcon} style={styles.sectionIcon} resizeMode="contain" />
                        <Text style={styles.sectionTitle}>Competências para o Matchmaking</Text>
                    </View>
                    
                    {/* Subtítulo Habilidades */}
                    <Text style={styles.subtitle}>
                        <Text style={styles.subtitleBold}>Habilidades:</Text> Liste as áreas técnicas/comportamentais (Ex: "Programação C#", "Design UX/UI", "Liderança de Equipes").
                    </Text>

                    {/* Tags de Habilidades (Grid) */}
                    <View style={styles.skillsContainer}>
                        {allSkills.map(renderSkillTag)}
                    </View>
                </View>

                {/* Seção 2: DESCRIÇÃO */}
                <View style={styles.sectionDescription}>
                    <Text style={styles.descriptionTitle}>Descrição</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        multiline={true} // Permite múltiplas linhas
                        placeholder="Escreva sobre seus objetivos e o tipo de grupo que você procura..."
                        placeholderTextColor={Colors.TextoNeutro}
                        value={description}
                        onChangeText={setDescription} // [FUNCIONALIDADE] Permite escrever
                    />
                </View>
                
                {/* Botão Salvar - salva e volta para profilepage */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        // Aqui você pode adicionar a lógica de salvar (API/local storage)
                        // Depois retorna para a página de perfil
                        router.push('/profilepage');
                    }}
                >
                    <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>

                {/* Espaçador final */}
                <View style={{ height: 40 }} />

            </ScrollView>

            {/* Rodapé de Logos (Fixo) */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Connect Fiap</Text>
                <Image source={LinkedInIcon} style={styles.footerIcon} resizeMode="contain" />
                <Image source={OracleLogo} style={styles.footerIcon} resizeMode="contain" />
                <Image source={GitLogo} style={styles.footerIcon} resizeMode="contain" />
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
    },
    
    // --- Botão Voltar ---
    backButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 8,
    },
    backText: {
        color: Colors.TextoClaro,
        fontSize: 14,
        fontWeight: '600',
    },

    // --- Header com Foto e Nome ---
    profileHeader: {
        alignItems: 'center',
        marginBottom: 5,
    },
    profileImageBorder: {
        borderRadius: 100, 
        borderWidth: 2,
        borderColor: Colors.DestaqueFIAP,
        padding: 2,
        marginBottom: 10,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    userName: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.TextoClaro,
        marginBottom: 12,
    },

    // --- Card de Seção ---
    sectionCard: {
        backgroundColor: Colors.CardFundo,
        marginHorizontal: 20,
        borderRadius: 12,
        padding: 18,
        marginBottom: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionIcon: {
        width: 26,
        height: 26,
        marginRight: 12,
        tintColor: Colors.DestaqueFIAP,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.TextoClaro,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.TextoNeutro,
        marginBottom: 12,
        lineHeight: 20,
    },
    subtitleBold: {
        fontWeight: 'bold',
        color: Colors.DestaqueFIAP,
    },

    // --- Tags de Habilidades (GRID) ---
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Permite que as tags quebrem a linha
        justifyContent: 'flex-start',
        marginTop: 8,
    },
    skillTag: {
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 6,
        margin: 6,
        borderWidth: 1.2,
    },
    skillTagDefault: {
        backgroundColor: Colors.TagDefault,
        borderColor: Colors.TagBorder,
    },
    skillTagSelected: {
        backgroundColor: Colors.DestaqueFIAP,
        borderColor: Colors.DestaqueFIAP,
    },
    skillText: {
        color: Colors.TextoClaro,
        fontSize: 13,
        fontWeight: '600',
    },

    // --- Descrição ---
    sectionDescription: {
        marginHorizontal: 20,
        marginBottom: 18,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.TextoClaro,
        marginBottom: 12,
    },
    descriptionInput: {
        backgroundColor: Colors.CardFundo,
        color: Colors.TextoClaro,
        borderRadius: 10,
        padding: 12,
        minHeight: 100, // Altura mínima para o campo
        textAlignVertical: 'top', // Garante que o texto comece no topo (apenas Android)
        fontSize: 15,
        borderWidth: 1,
        borderColor: Colors.TagBorder,
    },
    
    // --- Botão Salvar ---
    saveButton: {
        backgroundColor: Colors.DestaqueFIAP,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 18,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 8,
    },
    saveButtonText: {
        color: Colors.TextoClaro,
        fontSize: 16,
        fontWeight: '700',
    },

    // --- Rodapé de Logos ---
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: Colors.FundoEscuro,
        borderTopWidth: 1,
        borderColor: Colors.DestaqueFIAP,
    },
    footerIcon: {
        width: 25,
        height: 25,
        tintColor: Colors.DestaqueFIAP, 
    },
    footerText: {
        color: Colors.TextoNeutro,
        fontSize: 12,
    },
});
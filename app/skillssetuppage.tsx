import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { useTheme } from '../src/contexts/ThemeContext';

// As 7 disciplinas reais do Challenge Oracle
const disciplinas = [
    "Mobile Application Development",
    "Java Advanced",
    "DevOps Tools e Cloud Computing",
    "Mastering Relational Database",
    "Advanced Business Development with .NET",
    "Disruptive Architectures IoT e GenIA",
    "Compliance Quality Assurance e Tests",
];

export default function SkillsSetupPage() {
    const router = useRouter();
    const { getRm } = useAuth();
    const { colors } = useTheme();

    const userName = getRm() || 'Aluno';

    // Controla quais disciplinas o aluno selecionou
    const [selectedSkills, setSelectedSkills] = useState(new Set<string>());
    // Controla se o aluno marcou "sem preferencia"
    const [semPreferencia, setSemPreferencia] = useState(false);

    const goBack = () => {
        router.push('/profilepage');
    };

    // Alterna selecao de uma disciplina individual
    const toggleSkill = (skill: string) => {
        if (semPreferencia) return; // Se marcou sem preferencia, nao pode selecionar individual
        const newSkills = new Set(selectedSkills);
        if (newSkills.has(skill)) {
            newSkills.delete(skill);
        } else {
            newSkills.add(skill);
        }
        setSelectedSkills(newSkills);
    };

    // Alterna o modo "sem preferencia" que limpa as selecoes individuais
    const toggleSemPreferencia = () => {
        if (!semPreferencia) {
            setSelectedSkills(new Set());
        }
        setSemPreferencia(!semPreferencia);
    };

    const handleSave = () => {
        if (semPreferencia) {
            Alert.alert('Salvo', 'Busca configurada sem preferencia de disciplina. Todos os grupos compativeis serao exibidos.');
        } else if (selectedSkills.size === 0) {
            Alert.alert('Atencao', 'Selecione pelo menos uma disciplina ou marque "Sem preferencia".');
            return;
        } else {
            Alert.alert('Salvo', `${selectedSkills.size} disciplina(s) selecionada(s) para matchmaking.`);
        }
        router.push('/searchpage');
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.FundoPrincipal }]}>
            <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 40 }]}>
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Text style={[styles.backText, { color: colors.DestaqueFIAP }]}>{'< Voltar'}</Text>
                </TouchableOpacity>

                <Text style={[styles.pageTitle, { color: colors.TextoPrincipal }]}>Competencias para Matchmaking</Text>
                <Text style={[styles.subtitle, { color: colors.TextoSecundario }]}>
                    Selecione as disciplinas que voce pode cobrir no Challenge. O sistema vai buscar grupos que precisam dessas materias.
                </Text>

                {/* Info do usuario */}
                <View style={[styles.userCard, { backgroundColor: colors.FundoCard }]}>
                    <Text style={[styles.userLabel, { color: colors.TextoSecundario }]}>Aluno</Text>
                    <Text style={[styles.userValue, { color: colors.TextoPrincipal }]}>{userName}</Text>
                </View>

                {/* Lista de disciplinas */}
                <View style={styles.skillsContainer}>
                    <Text style={[styles.sectionTitle, { color: colors.TextoPrincipal }]}>Disciplinas do Challenge</Text>

                    {disciplinas.map(skill => (
                        <TouchableOpacity
                            key={skill}
                            style={[
                                styles.skillTag,
                                { backgroundColor: colors.FundoCard, borderColor: colors.InputBorda },
                                selectedSkills.has(skill) && { backgroundColor: colors.DestaqueFIAP, borderColor: colors.DestaqueFIAP },
                                semPreferencia && { opacity: 0.4 },
                            ]}
                            onPress={() => toggleSkill(skill)}
                            disabled={semPreferencia}
                        >
                            <Text style={[
                                styles.skillText,
                                { color: colors.TextoPrincipal },
                                selectedSkills.has(skill) && { color: '#FFFFFF' },
                            ]}>
                                {skill}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    {/* Opcao sem preferencia */}
                    <TouchableOpacity
                        style={[
                            styles.semPreferenciaTag,
                            { borderColor: colors.DestaqueFIAP },
                            semPreferencia && { backgroundColor: colors.DestaqueFIAP },
                        ]}
                        onPress={toggleSemPreferencia}
                    >
                        <Text style={[
                            styles.skillText,
                            { color: colors.DestaqueFIAP },
                            semPreferencia && { color: '#FFFFFF' },
                        ]}>
                            Sem preferencia (ver todos os grupos)
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Resumo da selecao */}
                <View style={[styles.resumeCard, { backgroundColor: colors.FundoCard }]}>
                    <Text style={[styles.resumeTitle, { color: colors.TextoPrincipal }]}>Resumo</Text>
                    <Text style={[styles.resumeText, { color: colors.TextoSecundario }]}>
                        {semPreferencia
                            ? 'Sem preferencia - todos os grupos compativeis serao exibidos'
                            : selectedSkills.size > 0
                                ? `${selectedSkills.size} disciplina(s) selecionada(s)`
                                : 'Nenhuma disciplina selecionada'}
                    </Text>
                </View>

                {/* Botao salvar */}
                <TouchableOpacity
                    style={[styles.saveButton, { backgroundColor: colors.DestaqueFIAP }]}
                    onPress={handleSave}
                >
                    <Text style={styles.saveButtonText}>Salvar e Buscar Grupos</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: { paddingHorizontal: 20, paddingTop: 12 },
    backButton: { paddingVertical: 8, marginBottom: 8 },
    backText: { fontSize: 16, fontWeight: '700' },
    pageTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
    subtitle: { fontSize: 14, lineHeight: 20, marginBottom: 20 },
    userCard: {
        borderRadius: 10,
        padding: 14,
        marginBottom: 20,
    },
    userLabel: { fontSize: 12, marginBottom: 4 },
    userValue: { fontSize: 18, fontWeight: 'bold' },
    skillsContainer: { marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
    skillTag: {
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 8,
        borderWidth: 1,
    },
    skillText: { fontSize: 14, fontWeight: '600' },
    semPreferenciaTag: {
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginTop: 8,
        borderWidth: 2,
        borderStyle: 'dashed',
        alignItems: 'center',
    },
    resumeCard: {
        borderRadius: 10,
        padding: 14,
        marginBottom: 20,
    },
    resumeTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
    resumeText: { fontSize: 14 },
    saveButton: {
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginBottom: 20,
    },
    saveButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../src/contexts/AuthContext';
import { useTheme } from '../src/contexts/ThemeContext';
import {
    buscarHabilidades,
    salvarHabilidades,
} from '../src/services/apexApi';

// As 7 disciplinas do Challenge - sigla bate com o que esta no banco
const disciplinas = [
    { sigla: 'MOBILE', nome: 'Mobile Application Development' },
    { sigla: 'JAVA', nome: 'Java Advanced' },
    { sigla: 'DEVOPS', nome: 'DevOps Tools e Cloud Computing' },
    { sigla: 'BD', nome: 'Mastering Relational Database' },
    { sigla: 'DOTNET', nome: 'Advanced Business Development with .NET' },
    { sigla: 'IOT', nome: 'Disruptive Architectures IoT e GenIA' },
    { sigla: 'SQA', nome: 'Compliance Quality Assurance e Tests' },
];

export default function SkillsSetupPage() {
    const router = useRouter();
    const { getRm } = useAuth();
    const { colors } = useTheme();

    const userName = getRm() || 'Aluno';

    // Disciplinas selecionadas (siglas)
    const [selectedSkills, setSelectedSkills] = useState(new Set<string>());
    const [semPreferencia, setSemPreferencia] = useState(false);

    // Estados de loading
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    // Carrega as habilidades atuais do aluno na hora que abre a tela
    useEffect(() => {
        const carregarHabilidades = async () => {
            const rm = getRm();
            if (!rm) {
                setCarregando(false);
                return;
            }
            try {
                const habilidades = await buscarHabilidades(rm);
                const siglas = new Set(habilidades.map(h => h.sigla));
                setSelectedSkills(siglas);
                // Se nao tem nenhuma habilidade salva, marca sem preferencia
                if (siglas.size === 0) {
                    setSemPreferencia(true);
                }
            } catch (error) {
                console.log('Erro ao carregar habilidades:', error);
                Alert.alert('Erro', 'Nao foi possivel carregar suas habilidades.');
            } finally {
                setCarregando(false);
            }
        };
        carregarHabilidades();
    }, []);

    const goBack = () => {
        router.push('/profilepage');
    };

    // Alterna selecao individual
    const toggleSkill = (sigla: string) => {
        if (semPreferencia) return;
        const newSkills = new Set(selectedSkills);
        if (newSkills.has(sigla)) {
            newSkills.delete(sigla);
        } else {
            newSkills.add(sigla);
        }
        setSelectedSkills(newSkills);
    };

    // Alterna o modo sem preferencia
    const toggleSemPreferencia = () => {
        if (!semPreferencia) {
            setSelectedSkills(new Set());
        }
        setSemPreferencia(!semPreferencia);
    };

    const handleSave = async () => {
        const rm = getRm();
        if (!rm) {
            Alert.alert('Erro', 'Usuario nao identificado.');
            return;
        }

        if (!semPreferencia && selectedSkills.size === 0) {
            Alert.alert('Atencao', 'Selecione pelo menos uma disciplina ou marque "Sem preferencia".');
            return;
        }

        setSalvando(true);
        try {
            // Se for sem preferencia, salva array vazio (apaga todas)
            const siglas = semPreferencia ? [] : Array.from(selectedSkills);
            await salvarHabilidades(rm, siglas);

            Alert.alert(
                'Sucesso',
                semPreferencia
                    ? 'Configurado sem preferencia. Todos os grupos compativeis serao exibidos.'
                    : `${siglas.length} disciplina(s) salva(s) com sucesso.`,
                [{ text: 'OK', onPress: () => router.push('/searchpage') }]
            );
        } catch (error) {
            console.log('Erro ao salvar:', error);
            Alert.alert('Erro', 'Nao foi possivel salvar as habilidades.');
        } finally {
            setSalvando(false);
        }
    };

    if (carregando) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.FundoPrincipal, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.DestaqueFIAP} />
                <Text style={{ color: colors.TextoSecundario, marginTop: 12 }}>Carregando suas habilidades...</Text>
            </SafeAreaView>
        );
    }

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

                <View style={[styles.userCard, { backgroundColor: colors.FundoCard }]}>
                    <Text style={[styles.userLabel, { color: colors.TextoSecundario }]}>Aluno</Text>
                    <Text style={[styles.userValue, { color: colors.TextoPrincipal }]}>{userName}</Text>
                </View>

                <View style={styles.skillsContainer}>
                    <Text style={[styles.sectionTitle, { color: colors.TextoPrincipal }]}>Disciplinas do Challenge</Text>

                    {disciplinas.map(d => (
                        <TouchableOpacity
                            key={d.sigla}
                            style={[
                                styles.skillTag,
                                { backgroundColor: colors.FundoCard, borderColor: colors.InputBorda },
                                selectedSkills.has(d.sigla) && { backgroundColor: colors.DestaqueFIAP, borderColor: colors.DestaqueFIAP },
                                semPreferencia && { opacity: 0.4 },
                            ]}
                            onPress={() => toggleSkill(d.sigla)}
                            disabled={semPreferencia}
                        >
                            <Text style={[
                                styles.skillText,
                                { color: colors.TextoPrincipal },
                                selectedSkills.has(d.sigla) && { color: '#FFFFFF' },
                            ]}>
                                {d.nome}
                            </Text>
                        </TouchableOpacity>
                    ))}

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

                <TouchableOpacity
                    style={[styles.saveButton, { backgroundColor: colors.DestaqueFIAP }, salvando && { opacity: 0.7 }]}
                    onPress={handleSave}
                    disabled={salvando}
                >
                    {salvando ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.saveButtonText}>Salvar e Buscar Grupos</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: { paddingHorizontal: 20, paddingTop: 40 },
    backButton: { paddingVertical: 8, marginBottom: 8 },
    backText: { fontSize: 16, fontWeight: '700' },
    pageTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
    subtitle: { fontSize: 14, lineHeight: 20, marginBottom: 20 },
    userCard: { borderRadius: 10, padding: 14, marginBottom: 20 },
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
    resumeCard: { borderRadius: 10, padding: 14, marginBottom: 20 },
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
import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
// Paleta de cores
const Colors = {
  FundoEscuro: '#000000',
  DestaqueFIAP: '#F23064',
  TextoClaro: '#FFFFFF',
  TextoNeutro: '#8C8C8C',
  CardFundo: '#1A1A1A',
  CardBorda: '#C8102E',
};

// Componente de Tag de Habilidade 
type SkillTagProps = { text: string };
function SkillTag({ text }: SkillTagProps) {
  return (
    <View style={styles.skillTag}>
      <Text style={styles.skillText}>{text}</Text>
    </View>
  );
}

// Tela principal 
export default function GroupDetailsPage() {
  const router = useRouter();

  // Dados mockados do grupo
  const groupData = {
    name: 'Conexão Anjo',
    members: 'Carlos Clementino e Arthur Ribeiro Algafe',
    status: 'Buscando Membros (1 vaga)',
    description:
      'Aplicativo mobile desenvolvido pelo Grupo ARC para conectar pessoas afetadas por desastres naturais, enchentes, deslizamentos, queimadas a pontos de apoio, doadores e serviços essenciais. Focado em agilidade, acessibilidade e inclusão digital, o app oferece mapeamento de doações, conexão direta com voluntários, busca filtrada de recursos e atualizações em tempo real. Uma solução que une tecnologia e empatia para fortalecer a resposta humanitária em situações de crise.',
    requiredSkills: [
      'Java Advanced',
      'DevOps Tools e Cloud Computing',
      'Mobile Application Development',
    ],
  };

  // voltar pra tela anterior
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleJoin = useCallback(() => {
    Alert.alert(
      'Candidatura enviada',
      `Você demonstrou interesse no grupo ${groupData.name}!`
    );

    router.replace('/dashboard');
  }, [groupData.name, router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Botão Voltar */}
        <TouchableOpacity style={styles.backButton} onPress= {goBack}>
          <Text style={styles.backText}>{'< Voltar'}</Text>
        </TouchableOpacity>

        {/* Bloco Principal do Grupo */}
        <View style={styles.infoBlock}>
          <Image
            // 👇 aqui usamos require() direto
            source={require('../../assets/images/ConexãoAnjo.png')}
            style={styles.groupLogo}
            resizeMode="contain"
          />

          <View style={styles.textInfo}>
            <Text style={styles.groupName}>{groupData.name}</Text>
            <Text style={styles.memberList}>
              Integrantes: {groupData.members}
            </Text>
            <Text style={styles.statusText}>
              Status Atual: {groupData.status}
            </Text>
          </View>
        </View>

        {/* Descrição */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição</Text>

          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>
              {groupData.description}
            </Text>
          </View>
        </View>

        {/*zzz Habilidades Desejadas */}
        <View style={styles.section}>
          <View style={styles.skillsHeader}>
            <Image
              source={require('../../assets/images/Learning.png')}
              style={styles.skillsIcon}
              resizeMode="contain"
            />
            <Text style={styles.skillsTitle}>Habilidades Desejadas</Text>
          </View>

          <View style={styles.skillsContainer}>
            {groupData.requiredSkills.map((skill) => (
              <SkillTag key={skill} text={skill} />
            ))}
          </View>
        </View>

        {/* Bloco de Ação */}
        <View style={styles.actionBlock}>
          <Text style={styles.actionTitle}>Entre Já!</Text>
          <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
            <Text style={styles.joinButtonText}>Candidatar-se</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
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
    padding: 16,
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    color: Colors.TextoClaro,
    fontSize: 16,
  },
  infoBlock: {
    backgroundColor: Colors.CardFundo,
    borderColor: Colors.CardBorda,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  groupLogo: {
    width: 72,
    height: 72,
    marginRight: 12,
  },
  textInfo: {
    flex: 1,
  },
  groupName: {
    color: Colors.TextoClaro,
    fontSize: 20,
    fontWeight: '600',
  },
  memberList: {
    color: Colors.TextoNeutro,
    marginTop: 4,
  },
  statusText: {
    color: Colors.DestaqueFIAP,
    marginTop: 6,
    fontWeight: '600',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    color: Colors.TextoClaro,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionBox: {
    backgroundColor: Colors.CardFundo,
    borderColor: Colors.CardBorda,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  descriptionText: {
    color: Colors.TextoNeutro,
    lineHeight: 20,
  },
  skillsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillsIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  skillsTitle: {
    color: Colors.TextoClaro,
    fontSize: 16,
    fontWeight: '600',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: Colors.CardFundo,
    borderColor: Colors.DestaqueFIAP,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: Colors.TextoClaro,
    fontSize: 13,
  },
  actionBlock: {
    marginTop: 24,
    backgroundColor: Colors.CardFundo,
    borderColor: Colors.CardBorda,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  actionTitle: {
    color: Colors.TextoClaro,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  joinButton: {
    backgroundColor: Colors.DestaqueFIAP,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  joinButtonText: {
    color: Colors.TextoClaro,
    fontSize: 16,
    fontWeight: '600',
  },
});

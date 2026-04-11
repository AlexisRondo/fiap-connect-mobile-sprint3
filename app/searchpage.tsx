import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native';
import { useRouter, type Href } from 'expo-router'; // <-- Href adicionado
import React, { useState } from 'react';

// [IMPORTS CORRIGIDOS E NECESSÁRIOS]
const PerfilIcon = require('../assets/images/perfil.png');
const ViaMobilityLogo = require('../assets/images/ViaMobility.jpg');
const ConexaoAnjoLogo = require('../assets/images/ConexãoAnjo.png');
const GruposIcon = require('../assets/images/MaskGrup.png');
const ChatIcon = require('../assets/images/mensagem.png');
const LinkedInIcon = require('../assets/images/link.png');
const GitLogo = require('../assets/images/git.png');
const OracleLogo = require('../assets/images/Oracle.png');

// Paleta de Cores da FIAP
const Colors = {
  FundoEscuro: '#000000',
  DestaqueFIAP: '#F23064', 
  TextoClaro: '#FFFFFF',
  TextoNeutro: '#8C8C8C',
  CardFundo: '#1A1A1A', 
  TagDefault: '#333333',
};

// --- SIMULAÇÃO DE DADOS GLOBAIS ---
const allFilterSkills = [
  "Mobile Application Development", "Java Advanced", "Non-Relational Database", 
  "Development with .NET", "DevOps Tools e Cloud Computing", "Liderança de Grupo",
  "Disruptive Architectures IoT, IOB e Generative IA", "Compliance, Quality Assurance e Tests",
];
const allStatus = ["Disponível", "Lider", "Grupo", "Membros"];

// [TIPAGEM] Interface para o componente ResultCard
interface ResultCardProps {
  title: string;
  description: string;
  logoSource: any;
  isGroup: boolean;
  onPress: () => void;
}

// --- Componente de Cartão de Resultado (Aluno ou Grupo) ---
const ResultCard: React.FC<ResultCardProps> = ({ title, description, logoSource, isGroup, onPress }) => (
  <TouchableOpacity style={styles.resultCard} onPress={onPress}>
    <View style={styles.logoContainer}>
      <Image 
        source={logoSource} 
        style={styles.resultLogo} 
        borderRadius={isGroup ? 8 : 25}
        resizeMode="contain" 
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription} numberOfLines={2}>{description}</Text>
    </View>
  </TouchableOpacity>
);

// -----------------------------------------------------
// --- COMPONENTE PRINCIPAL (SearchPage) ---
// -----------------------------------------------------
export default function SearchPage() {
  const router = useRouter(); 
  
  // [ESTADO] Filtros e Lógica de Dropdown
  const [selectedSkills, setSelectedSkills] = useState(new Set<string>());
  const [selectedStatus, setSelectedStatus] = useState(new Set<string>());
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const goBack = () => {
    router.replace('/dashboard'); 
  };

  // ✅ helper seguro para navegação (sem perder o literal type)
  const safePush = (href: Href) => router.push(href);

  // ✅ Mapa ID -> Rota (ajuste os nomes para seus arquivos reais em app/grupos/)
  const routesByItem: Record<string, Href> = {
    // GRUPOS
    conexao_anjo: "/grupos/groupdetailspage",           // app/grupos/groupdetailspage.tsx
    via_mobility: "/grupos/grupdetalisviamobily",   // app/grupos/groupdetails-viamobility.tsx
    fiap_connect_group: "/grupos/grupdetailsfiap",    // app/grupos/groupdetails-fiap.tsx

    // PERFIS
    cleiton_souza: "/grupos/perfilcleiton",             // app/grupos/perfilcleiton.tsx
    hyoran_souza: "/grupos/perfilhyoran",               // app/grupos/perfilhyoran.tsx
    miguel_cimino: "/grupos/perfilmiguel",              // app/grupos/perfilmiguel.tsx
  };

  // [LÓGICA] Alternar a seleção da skill/status (Toggle)
  const toggleSelection = (set: Set<string>, item: string, setFunction: React.Dispatch<React.SetStateAction<Set<string>>>) => {
    const newSet = new Set(set);
    if (newSet.has(item)) newSet.delete(item);
    else newSet.add(item);
    setFunction(newSet);
  };

  // ✅ Ação ao clicar no card: usa o mapa acima
  const handleCardPress = (id: string) => {
    const route = routesByItem[id];
    if (route) {
      safePush(route);
    } else {
      console.warn(`Rota não mapeada para id: ${id}`);
    }
  };
  
  // SIMULAÇÃO DE RESULTADOS
  const searchResults = [
    { id: 'fiap_connect_group', title: 'Fiap Connect', description: 'Descrição: Este projeto é desenvolvido para uma...', logo: GruposIcon, isGroup: true },
    { id: 'conexao_anjo', title: 'Conexão Anjo', description: 'Descrição: Aplicativo mobile desenvolvido pelo...', logo: ConexaoAnjoLogo, isGroup: true, isSpecial: true },
    { id: 'via_mobility', title: 'ViaMobility', description: 'Descrição: O ViaMobility é um aplicativo criado...', logo: ViaMobilityLogo, isGroup: true },
    { id: 'cleiton_souza', title: 'Cleiton de Souza', description: 'Descrição: Sou aluno da Fiap a um ano e meio...', logo: PerfilIcon, isGroup: false },
    { id: 'hyoran_souza', title: 'Hyoran Souza', description: 'Descrição: Minha maior praticidade é no desing...', logo: PerfilIcon, isGroup: false },
    { id: 'miguel_cimino', title: 'Miguel Cimino', description: 'Descrição: Caso esteja procurando um pessoa...', logo: PerfilIcon, isGroup: false },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 140 }}>
        
        {/* Topo */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text style={styles.backText}>{'< Voltar'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton} onPress={() => safePush('/profile' as Href)}>
            <Image source={PerfilIcon} style={styles.profileIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Fiap Connect</Text>
        </View>

        {/* Busca + Filtro */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Turma/Curso"
            placeholderTextColor={Colors.TextoNeutro}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          
          <TouchableOpacity style={styles.filterIconContainer} onPress={() => setShowFilters(!showFilters)}>
            <Text style={styles.filterIcon}></Text> 
          </TouchableOpacity>
        </View>

        {/* Filtros */}
        {showFilters && ( 
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Filtro</Text>

            <Text style={styles.filterSubtitle}>Tags de Skills:</Text>
            <View style={styles.tagsContainer}>
              {allFilterSkills.map(skill => (
                <TouchableOpacity
                  key={skill}
                  style={[styles.skillTag, selectedSkills.has(skill) && styles.skillTagSelected]}
                  onPress={() => toggleSelection(selectedSkills, skill, setSelectedSkills)}
                >
                  <Text style={styles.skillText}>{skill}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.filterSubtitle, { marginTop: 15 }]}>Status:</Text>
            <View style={styles.tagsContainer}>
              {allStatus.map(status => (
                <TouchableOpacity
                  key={status}
                  style={[styles.skillTag, selectedStatus.has(status) && styles.skillTagSelected]}
                  onPress={() => toggleSelection(selectedStatus, status, setSelectedStatus)}
                >
                  <Text style={styles.skillText}>{status}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* LISTA DE RESULTADOS */}
        <View style={styles.resultsList}>
          {searchResults.map((item) => (
            <ResultCard
              key={item.id}
              title={item.title}
              description={item.description}
              logoSource={item.logo}
              isGroup={item.isGroup}
              onPress={() => handleCardPress(item.id)} // <-- só id, a rota vem do mapa
            />
          ))}
        </View>
        
        <View style={{ height: 100 }} />
        
      </ScrollView>

      {/* Rodapé */}
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

  // --- Top Bar ---
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderColor: Colors.DestaqueFIAP + "30",
  },
  backButton: {
    paddingVertical: 10,
  },
  backText: {
    color: Colors.DestaqueFIAP,
    fontSize: 16,
    fontWeight: "700",
  },
  profileButton: {
    padding: 18,
    backgroundColor: Colors.CardFundo,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  profileIcon: {
    width: 30,
    height: 30,
    tintColor: Colors.DestaqueFIAP,
  },

  // --- Header ---
  header: {
    paddingHorizontal: 26,
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.TextoClaro,
    letterSpacing: 0.5,
  },

  // --- Search Bar ---
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: "#141414",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.DestaqueFIAP,
    height: 52,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    color: Colors.TextoClaro,
    paddingHorizontal: 18,
    fontSize: 15,
  },
  filterIconContainer: {
    backgroundColor: Colors.DestaqueFIAP,
    height: "100%",
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  filterIcon: {
    fontSize: 20,
    color: Colors.TextoClaro,
  },

  // --- Filtros ---
  filterSection: {
    marginHorizontal: 20,
    padding: 18,
    backgroundColor: Colors.CardFundo,
    borderRadius: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: Colors.DestaqueFIAP + "60",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  filterTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.DestaqueFIAP,
    marginBottom: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  filterSubtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.TextoClaro,
    marginBottom: 6,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  skillTag: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1.5,
    backgroundColor: Colors.TagDefault,
    borderColor: Colors.TagDefault,
  },
  skillTagSelected: {
    backgroundColor: Colors.DestaqueFIAP,
    borderColor: Colors.DestaqueFIAP,
  },
  skillText: {
    color: Colors.TextoClaro,
    fontSize: 13,
    fontWeight: "600",
  },

  // --- Cards ---
  resultsList: {
    marginHorizontal: 20,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.CardFundo,
    padding: 20,
    borderRadius: 18,
    marginBottom: 22,
    borderLeftWidth: 4,
    borderColor: Colors.DestaqueFIAP,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  logoContainer: {
    marginRight: 15,
    backgroundColor: "#111",
    padding: 6,
    borderRadius: 12,
  },
  resultLogo: {
    width: 60,
    height: 60,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.TextoClaro,
    marginBottom: 3,
  },
  cardDescription: {
    fontSize: 13,
    color: Colors.TextoNeutro,
    lineHeight: 18,
  },

  // --- Footer ---
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#101010",
    borderTopWidth: 1,
    borderColor: Colors.DestaqueFIAP + "40",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  footerText: {
    color: Colors.TextoNeutro,
    fontSize: 13,
    fontWeight: "600",
  },
  footerIcon: {
    width: 28,
    height: 38,
    tintColor: Colors.DestaqueFIAP,
  },
});


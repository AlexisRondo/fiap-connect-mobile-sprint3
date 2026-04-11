import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const Colors = {
  FundoEscuro: "#000000",
  DestaqueFIAP: "#F23064",
  TextoClaro: "#FFFFFF",
  TextoNeutro: "#C9C9C9",
  CardFundo: "#0F0F0F",
  LinhaDiv: "#2a2a2a",
  OutlineCTA: "#2DA8FF",
};

function SkillTag({ text }: { text: string }) {
  return (
    <View style={styles.skillTag}>
      <Text style={styles.skillText}>{text}</Text>
    </View>
  );
}

export default function GroupDetailsFiapConnect() {
  const router = useRouter();

  const groupData = {
    name: "Fiap Connect",
    members: "Vinicius e Alexis Rondo",
    status: "Buscando Membros (1 vaga)",
    description:
      "Somos um grupo colaborativo da FIAP dedicado à formação inteligente de equipes acadêmicas. Nosso foco é unir alunos com habilidades complementares, interesses similares e boa comunicação para alcançar alto desempenho nos projetos.\n\nBuscamos promover organização, equilíbrio e comprometimento, com o uso de ferramentas modernas e um sistema de matchmaking que facilita a criação e a gestão de grupos de forma prática e eficiente.",
    requiredSkills: [
      "DevOps Tools e Cloud Computing",
      "Java Advanced",
      "Mobile Application Development",
    ],
  // use seu ícone aqui; mantém formato redondo
  avatar: require("../../assets/images/MaskGrup.png"),
  };

  const goBack = useCallback(() => router.back(), [router]);

  const handleJoin = useCallback(() => {
    Alert.alert(
      "Candidatura enviada",
      `Você demonstrou interesse no grupo ${groupData.name}!`
    );
    router.replace("/dashboard");
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 28 }}>
        {/* voltar */}
        <TouchableOpacity style={styles.backButton} onPress={goBack} hitSlop={12}>
          <Text style={styles.backText}>{"< Voltar"}</Text>
        </TouchableOpacity>

        {/* header do grupo */}
        <View style={styles.headerBlock}>
          <Image source={groupData.avatar} style={styles.groupAvatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.groupTitle}>{groupData.name}</Text>
            <Text style={styles.memberList}>Integrantes: {groupData.members}</Text>
            <Text style={styles.statusText}>Status Atual: {groupData.status}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        {/* descrição */}
        <Text style={styles.sectionTitle}>Descrição</Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>{groupData.description}</Text>
        </View>

        <View style={styles.separator} />

        {/* habilidades */}
        <View style={styles.skillsHeader}>
          <Image
            source={require("../../assets/images/Learning.png")}
            style={styles.skillsIcon}
          />
          <Text style={styles.skillsTitle}>Habilidades Desejadas</Text>
        </View>

        <View style={styles.skillsContainer}>
          {groupData.requiredSkills.map((s) => (
            <SkillTag key={s} text={s} />
          ))}
        </View>

        <View style={[styles.separator, { marginTop: 18 }]} />

        {/* CTA */}
        <Text style={styles.actionTitle}>Entre Já!</Text>
        <TouchableOpacity style={styles.joinButton} onPress={handleJoin} activeOpacity={0.85}>
          <Text style={styles.joinButtonText}>Venha participar do {groupData.name}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const AVATAR_SIZE = 44;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.FundoEscuro },
  container: { flex: 1, padding: 16 },

  backButton: { marginBottom: 8 },
  backText: { color: Colors.TextoClaro, fontSize: 16 },

  headerBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.CardFundo,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.LinhaDiv,
    marginBottom: 12,
  },

  // mantém qualquer imagem redonda
  groupAvatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: "hidden",
    backgroundColor: "#171717",
  },

  groupTitle: { color: Colors.TextoClaro, fontSize: 24, fontWeight: "800", marginBottom: 2 },
  memberList: { color: Colors.TextoClaro, opacity: 0.9 },
  statusText: { color: Colors.DestaqueFIAP, fontWeight: "700", marginTop: 4 },

  sectionTitle: { color: Colors.TextoClaro, fontSize: 16, fontWeight: "700", marginBottom: 8 },

  descriptionBox: {
    borderWidth: 1,
    borderColor: Colors.DestaqueFIAP,
    borderRadius: 14,
    padding: 14,
    backgroundColor: Colors.CardFundo,
  },
  descriptionText: { color: Colors.TextoClaro, lineHeight: 20 },

  separator: {
    height: 2,
    backgroundColor: Colors.DestaqueFIAP,
    borderRadius: 2,
    marginVertical: 14,
    opacity: 0.9,
  },

  skillsHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  skillsIcon: { width: 22, height: 22, tintColor: Colors.DestaqueFIAP },
  skillsTitle: { color: Colors.TextoClaro, fontSize: 16, fontWeight: "700" },

  skillsContainer: { flexDirection: "row", flexWrap: "wrap" },
  skillTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.DestaqueFIAP,
    backgroundColor: "#1A1A1A",
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: { color: Colors.TextoClaro, fontSize: 12.5 },

  actionTitle: {
    color: Colors.TextoClaro,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },
  joinButton: {
    alignSelf: "center",
    backgroundColor: Colors.DestaqueFIAP,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.OutlineCTA,
    minWidth: "80%",
  },
  joinButtonText: { color: Colors.TextoClaro, fontSize: 16, fontWeight: "700", textAlign: "center" },
});

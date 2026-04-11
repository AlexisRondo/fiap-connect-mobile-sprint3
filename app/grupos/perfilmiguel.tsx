import React, { useCallback } from "react";
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity,
  Image, SafeAreaView, Alert
} from "react-native";
import { useRouter } from "expo-router";

const Colors = {
  FundoEscuro: "#000000",
  DestaqueFIAP: "#F23064",
  TextoClaro: "#FFFFFF",
  TextoNeutro: "#C9C9C9",
  CardFundo: "#0F0F0F",
  LinhaDiv: "#2a2a2a",
};

function SkillTag({ text }: { text: string }) {
  return (
    <View style={styles.skillTag}>
      <Text style={styles.skillText}>{text}</Text>
    </View>
  );
}

export default function ProfileMiguel() {
  const router = useRouter();
  const goBack = useCallback(() => router.back(), [router]);

  const openChat = useCallback(() => {
    Alert.alert("Abrindo conversa", "Iniciando chat com Miguel Cimino...");
    router.push("../chat/miguel");
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 28 }}>
        <TouchableOpacity style={styles.backButton} onPress={goBack} hitSlop={12}>
          <Text style={styles.backText}>{"< Voltar"}</Text>
        </TouchableOpacity>

         <View style={styles.headerRow}>
                  <Image
                    source={require("../../assets/images/perfil.png")}
                    style={styles.avatar}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Hyoran Souza</Text>
                    <Text style={styles.bioLabel}>Bio:</Text>
                  </View>
                </View>

            
        {/* Descrição */}
        <Text style={styles.sectionTitle}>Descrição</Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            Miguel Cimino é estudante da FIAP e tem afinidade com tecnologia e inovação.
            Gosta de aprender sobre novas tendências da área e está sempre disposto a
            contribuir com ideias criativas. É curioso, comunicativo e busca evoluir
            constantemente por meio da prática e do trabalho em equipe.
          </Text>
        </View>

        <View style={styles.separator} />

        {/* Habilidades Desejadas */}
        <View style={styles.skillsHeader}>
          <Image
            source={require("../../assets/images/Learning.png")}
            style={styles.skillsIcon}
          />
          <Text style={styles.skillsTitle}>Habilidades Desejadas</Text>
        </View>

        <View style={styles.skillsContainer}>
          <SkillTag text="IoT, IOB e Generative IA" />
          <SkillTag text="Liderança de grupo" />
          <SkillTag text="Mobile Application Development" />
        </View>

        <View style={[styles.separator, { marginTop: 10 }]} />

        {/* CTA */}
        <Text style={styles.ctaTitle}>Entre Já!</Text>
        <TouchableOpacity onPress={openChat} activeOpacity={0.85} style={styles.chatButton}>
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const AVATAR = 64;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.FundoEscuro },
  container: { flex: 1, padding: 16 },

  backButton: { marginBottom: 8 },
  backText: { color: Colors.TextoClaro, fontSize: 16 },

  headerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },

  // mantém a imagem SEMPRE redonda
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: Colors.DestaqueFIAP,
    overflow: "hidden",
  },

  title: { color: Colors.TextoClaro, fontSize: 24, fontWeight: "800" },
  bioLabel: { color: Colors.TextoClaro, opacity: 0.85, marginTop: 2 },

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
    marginVertical: 16,
    opacity: 0.95,
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

  ctaTitle: {
    color: Colors.TextoClaro,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },

  chatButton: {
    alignSelf: "center",
    backgroundColor: Colors.DestaqueFIAP,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: "80%",
  },
  chatButtonText: {
    color: Colors.TextoClaro,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
});

import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../src/contexts/ThemeContext";

export default function ConversationsScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const handleBack = useCallback(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.FundoPrincipal }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} hitSlop={15}>
          <Text style={[styles.backArrow, { color: colors.DestaqueFIAP }]}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.TextoPrincipal }]}>Conversas</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Estado vazio */}
      <View style={styles.emptyContainer}>
        <View style={[styles.emptyIconCircle, { backgroundColor: colors.FundoCard }]}>
          <Image
            source={require('../assets/images/mensagem.png')}
            style={[styles.emptyIcon, { tintColor: colors.DestaqueFIAP }]}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.emptyTitle, { color: colors.TextoPrincipal }]}>
          Nenhuma conversa ainda
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.TextoSecundario }]}>
          Suas conversas com membros de grupo aparecerão aqui após entrar em um grupo pelo matchmaking.
        </Text>

        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: colors.DestaqueFIAP }]}
          onPress={() => router.push('/searchpage')}
        >
          <Text style={styles.searchButtonText}>Buscar Grupos</Text>
        </TouchableOpacity>
      </View>

      {/* Navegacao inferior */}
      <View style={[styles.bottomNav, { backgroundColor: colors.FundoPrincipal, borderColor: colors.Divisor }]}>
        <TouchableOpacity onPress={() => router.replace('/searchpage')} style={styles.navItem}>
          <Image
            source={require('../assets/images/MaskGrup.png')}
            style={[styles.navIconImage, { tintColor: colors.TextoSecundario }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/conversations')} style={styles.navItem}>
          <Image
            source={require('../assets/images/mensagem.png')}
            style={[styles.navIconImage, { tintColor: colors.DestaqueFIAP }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/profilepage')} style={styles.navItem}>
          <Image
            source={require('../assets/images/perfil.png')}
            style={[styles.navIconImage, { tintColor: colors.TextoSecundario }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backArrow: {
    fontSize: 20,
    fontWeight: "600",
    width: 24,
    textAlign: "left",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyIcon: {
    width: 36,
    height: 36,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  searchButton: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 30,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    paddingVertical: 12,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navIconImage: {
    width: 26,
    height: 26,
  },
});
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../src/contexts/AuthContext";
import { useTheme } from "../src/contexts/ThemeContext";
import {
  SolicitacaoRecebida,
  buscarSolicitacoesRecebidas,
  responderSolicitacao,
} from "../src/services/apexApi";

export default function InvitesPage() {
  const router = useRouter();
  const { getRm } = useAuth();
  const { colors } = useTheme();
  const rm = getRm() || "";

  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoRecebida[]>([]);
  const [carregando, setCarregando] = useState(true);
  // Controla qual solicitacao esta sendo processada (pra mostrar spinner so nela)
  const [processandoId, setProcessandoId] = useState<number | null>(null);

  const carregarSolicitacoes = async () => {
    if (!rm) return;
    try {
      const data = await buscarSolicitacoesRecebidas(rm);
      setSolicitacoes(data);
    } catch (error) {
      console.log("Erro ao buscar solicitacoes:", error);
      Alert.alert("Erro", "Nao foi possivel carregar os convites.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  const handleResponder = (
    idSolicitacao: number,
    acao: "aceitar" | "rejeitar",
    nomeOrigem: string,
  ) => {
    const titulo = acao === "aceitar" ? "Aceitar entrada?" : "Rejeitar entrada?";
    const mensagem =
      acao === "aceitar"
        ? `Tem certeza que quer aceitar ${nomeOrigem} no seu grupo?`
        : `Tem certeza que quer rejeitar a solicitacao de ${nomeOrigem}?`;

    Alert.alert(titulo, mensagem, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Confirmar",
        onPress: async () => {
          setProcessandoId(idSolicitacao);
          try {
            const resultado = await responderSolicitacao(idSolicitacao, acao);
            if (resultado.status === "OK") {
              Alert.alert(
                "Sucesso",
                acao === "aceitar"
                  ? `${nomeOrigem} foi aceito no grupo!`
                  : "Solicitacao rejeitada.",
              );
              // Remove da lista
              setSolicitacoes((prev) =>
                prev.filter((s) => s.id_solicitacao !== idSolicitacao),
              );
            } else {
              Alert.alert("Atencao", resultado.mensagem || "Erro ao processar.");
            }
          } catch (error) {
            console.log("Erro ao responder:", error);
            Alert.alert("Erro", "Falha ao processar solicitacao.");
          } finally {
            setProcessandoId(null);
          }
        },
      },
    ]);
  };

  const formatarData = (dataIso: string): string => {
    try {
      const d = new Date(dataIso);
      return d.toLocaleDateString("pt-BR");
    } catch {
      return dataIso;
    }
  };

  if (carregando) {
    return (
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            backgroundColor: colors.FundoPrincipal,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.DestaqueFIAP} />
        <Text style={{ color: colors.TextoSecundario, marginTop: 12 }}>
          Carregando convites...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.FundoPrincipal }]}
    >
      <View
        style={[
          styles.topBar,
          {
            backgroundColor: colors.FundoCard,
            borderColor: colors.DestaqueFIAP + "30",
          },
        ]}
      >
        <TouchableOpacity onPress={() => router.replace("/dashboard")}>
          <Text style={[styles.backText, { color: colors.DestaqueFIAP }]}>
            {"< Voltar"}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.TextoPrincipal }]}>
          Convites Recebidos
        </Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {solicitacoes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyTitle, { color: colors.TextoPrincipal }]}>
              Nenhum convite por enquanto
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.TextoSecundario }]}>
              Quando alguem solicitar entrada no seu grupo, aparece aqui.
            </Text>
          </View>
        ) : (
          solicitacoes.map((s) => (
            <View
              key={s.id_solicitacao}
              style={[
                styles.card,
                {
                  backgroundColor: colors.FundoCard,
                  borderColor: colors.DestaqueFIAP,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.avatar, { backgroundColor: colors.DestaqueFIAP + "30" }]}>
                  <Text style={{ fontSize: 24 }}>👤</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.cardName, { color: colors.TextoPrincipal }]}>
                    {s.nome_origem}
                  </Text>
                  <Text style={[styles.cardRm, { color: colors.TextoSecundario }]}>
                    {s.rm_origem} · {formatarData(s.data_solicitacao)}
                  </Text>
                </View>
              </View>

              <View style={[styles.groupTag, { backgroundColor: colors.DestaqueFIAP + "20" }]}>
                <Text style={[styles.groupTagText, { color: colors.DestaqueFIAP }]}>
                  Grupo: {s.nome_grupo}
                </Text>
              </View>

              <View style={[styles.messageBox, { backgroundColor: colors.FundoPrincipal }]}>
                <Text style={[styles.messageText, { color: colors.TextoPrincipal }]}>
                  {s.mensagem}
                </Text>
              </View>

              {processandoId === s.id_solicitacao ? (
                <ActivityIndicator color={colors.DestaqueFIAP} style={{ marginTop: 12 }} />
              ) : (
                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={[styles.rejectButton, { borderColor: "#E74C3C" }]}
                    onPress={() => handleResponder(s.id_solicitacao, "rejeitar", s.nome_origem)}
                  >
                    <Text style={[styles.rejectText, { color: "#E74C3C" }]}>Rejeitar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.acceptButton, { backgroundColor: "#27AE60" }]}
                    onPress={() => handleResponder(s.id_solicitacao, "aceitar", s.nome_origem)}
                  >
                    <Text style={styles.acceptText}>Aceitar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backText: { fontSize: 16, fontWeight: "700", width: 60 },
  title: { fontSize: 18, fontWeight: "700" },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  emptyTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8, textAlign: "center" },
  emptySubtitle: { fontSize: 14, textAlign: "center", lineHeight: 20 },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderLeftWidth: 4,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardName: { fontSize: 16, fontWeight: "700" },
  cardRm: { fontSize: 12, marginTop: 2 },
  groupTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  groupTagText: { fontSize: 12, fontWeight: "700" },
  messageBox: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  messageText: { fontSize: 14, lineHeight: 19 },
  actionsRow: { flexDirection: "row", gap: 10 },
  rejectButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: "center",
  },
  rejectText: { fontWeight: "700", fontSize: 14 },
  acceptButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  acceptText: { color: "#FFF", fontWeight: "700", fontSize: 14 },
});
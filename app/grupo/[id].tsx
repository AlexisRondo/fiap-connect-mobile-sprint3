import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../../src/contexts/AuthContext";
import { useTheme } from "../../src/contexts/ThemeContext";
import {
    DisciplinaGrupo,
    GrupoDetalhes,
    MembroGrupo,
    buscarDisciplinasGrupo,
    buscarGrupoDetalhes,
    buscarMembrosGrupo,
    criarSolicitacao,
} from "../../src/services/apexApi";

export default function DetalhesGrupoPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getRm } = useAuth();
  const { colors } = useTheme();

  const idGrupo = Number(id);
  const rmAluno = getRm() || "";

  const [grupo, setGrupo] = useState<GrupoDetalhes | null>(null);
  const [membros, setMembros] = useState<MembroGrupo[]>([]);
  const [disciplinas, setDisciplinas] = useState<DisciplinaGrupo[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Estados para o envio de solicitacao
  const [mostrandoForm, setMostrandoForm] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Verifica se o usuario logado ja esta no grupo (nesse caso nao mostra botao de entrar)
  const jaEhMembro = membros.some((m) => m.rm === rmAluno);

  // Carrega os 3 conjuntos de dados em paralelo
  useEffect(() => {
    const carregar = async () => {
      try {
        const [g, m, d] = await Promise.all([
          buscarGrupoDetalhes(idGrupo),
          buscarMembrosGrupo(idGrupo),
          buscarDisciplinasGrupo(idGrupo),
        ]);
        setGrupo(g);
        setMembros(m);
        setDisciplinas(d);
      } catch (error) {
        console.log("Erro ao carregar grupo:", error);
        Alert.alert("Erro", "Nao foi possivel carregar dados do grupo.");
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

  const handleEnviarSolicitacao = async () => {
    if (mensagem.trim().length < 10) {
      Alert.alert(
        "Atencao",
        "Escreva uma mensagem com pelo menos 10 caracteres explicando seu interesse.",
      );
      return;
    }

    setEnviando(true);
    try {
      const resultado = await criarSolicitacao(
        rmAluno,
        idGrupo,
        mensagem.trim(),
      );

      if (resultado.status === "OK") {
        Alert.alert(
          "Sucesso",
          "Solicitacao enviada! O lider do grupo recebera seu pedido.",
          [{ text: "OK", onPress: () => router.back() }],
        );
      } else {
        Alert.alert(
          "Atencao",
          resultado.mensagem || "Nao foi possivel enviar.",
        );
      }
    } catch (error) {
      console.log("Erro ao enviar solicitacao:", error);
      Alert.alert("Erro", "Falha ao enviar solicitacao.");
    } finally {
      setEnviando(false);
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
          Carregando detalhes...
        </Text>
      </SafeAreaView>
    );
  }

  if (!grupo) {
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
        <Text style={{ color: colors.TextoPrincipal, fontSize: 16 }}>
          Grupo nao encontrado
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 20 }}
        >
          <Text style={{ color: colors.DestaqueFIAP, fontSize: 16 }}>
            Voltar
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const disciplinasLivres = disciplinas.filter((d) => d.situacao === "LIVRE");
  const disciplinasAssumidas = disciplinas.filter(
    (d) => d.situacao === "ASSUMIDA",
  );
  const podeSolicitar =
    !jaEhMembro &&
    grupo.status_grupo === "ABERTO" &&
    grupo.vagas_disponiveis > 0;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.FundoPrincipal }]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header com botao voltar */}
        <View
          style={[
            styles.topBar,
            {
              backgroundColor: colors.FundoCard,
              borderColor: colors.DestaqueFIAP + "30",
            },
          ]}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.backText, { color: colors.DestaqueFIAP }]}>
              {"< Voltar"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card do grupo */}
        <View
          style={[
            styles.groupCard,
            {
              backgroundColor: colors.FundoCard,
              borderColor: colors.DestaqueFIAP,
            },
          ]}
        >
          <Text style={[styles.groupName, { color: colors.TextoPrincipal }]}>
            {grupo.nome_grupo}
          </Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  grupo.status_grupo === "ABERTO" ? "#27AE60" : "#999",
              },
            ]}
          >
            <Text style={styles.statusText}>{grupo.status_grupo}</Text>
          </View>

          <Text style={[styles.description, { color: colors.TextoSecundario }]}>
            {grupo.descricao_projeto}
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: colors.DestaqueFIAP }]}>
                {grupo.total_membros}/{grupo.max_integrantes}
              </Text>
              <Text
                style={[styles.statLabel, { color: colors.TextoSecundario }]}
              >
                Membros
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: colors.DestaqueFIAP }]}>
                {grupo.vagas_disponiveis}
              </Text>
              <Text
                style={[styles.statLabel, { color: colors.TextoSecundario }]}
              >
                Vagas
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: colors.DestaqueFIAP }]}>
                {disciplinasLivres.length}
              </Text>
              <Text
                style={[styles.statLabel, { color: colors.TextoSecundario }]}
              >
                Disc. livres
              </Text>
            </View>
          </View>
        </View>

        {/* Membros */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TextoPrincipal }]}>
            Membros do Grupo
          </Text>
          {membros.map((m) => (
            <View
              key={m.id_usuario}
              style={[styles.memberCard, { backgroundColor: colors.FundoCard }]}
            >
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: colors.DestaqueFIAP + "30" },
                ]}
              >
                <Text style={{ fontSize: 24 }}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={[styles.memberName, { color: colors.TextoPrincipal }]}
                >
                  {m.nome_completo}
                  {m.rm === rmAluno ? " (voce)" : ""}
                </Text>
                <Text
                  style={[styles.memberRm, { color: colors.TextoSecundario }]}
                >
                  {m.rm}
                </Text>
              </View>
              <View
                style={[
                  styles.cargoBadge,
                  {
                    backgroundColor:
                      m.cargo === "LIDER"
                        ? colors.DestaqueFIAP
                        : colors.TextoSecundario + "40",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.cargoText,
                    {
                      color:
                        m.cargo === "LIDER" ? "#FFF" : colors.TextoPrincipal,
                    },
                  ]}
                >
                  {m.cargo}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Disciplinas */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.TextoPrincipal }]}>
            Disciplinas do Challenge
          </Text>

          {disciplinasAssumidas.length > 0 && (
            <>
              <Text
                style={[styles.subSection, { color: colors.TextoSecundario }]}
              >
                Ja cobertas:
              </Text>
              <View style={styles.disciplinasRow}>
                {disciplinasAssumidas.map((d) => (
                  <View
                    key={d.id_habilidade}
                    style={[
                      styles.disciplinaTag,
                      {
                        backgroundColor: colors.DestaqueFIAP + "20",
                        borderColor: colors.DestaqueFIAP,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.disciplinaText,
                        { color: colors.DestaqueFIAP },
                      ]}
                    >
                      {d.sigla}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {disciplinasLivres.length > 0 && (
            <>
              <Text
                style={[styles.subSection, { color: colors.TextoSecundario }]}
              >
                Faltam ser cobertas:
              </Text>
              <View style={styles.disciplinasRow}>
                {disciplinasLivres.map((d) => (
                  <View
                    key={d.id_habilidade}
                    style={[
                      styles.disciplinaTag,
                      {
                        backgroundColor: colors.FundoCard,
                        borderColor: colors.TextoSecundario,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.disciplinaText,
                        { color: colors.TextoSecundario },
                      ]}
                    >
                      {d.sigla}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        {/* Botao solicitar entrada */}
        {jaEhMembro && (
          <View
            style={[
              styles.infoBox,
              { backgroundColor: colors.FundoCard, borderColor: "#27AE60" },
            ]}
          >
            <Text
              style={{
                color: colors.TextoPrincipal,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Voce ja faz parte deste grupo
            </Text>
          </View>
        )}

        {!jaEhMembro && !podeSolicitar && (
          <View
            style={[
              styles.infoBox,
              { backgroundColor: colors.FundoCard, borderColor: "#E74C3C" },
            ]}
          >
            <Text
              style={{
                color: colors.TextoPrincipal,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Este grupo nao esta aceitando novos membros
            </Text>
          </View>
        )}

        {podeSolicitar && !mostrandoForm && (
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: colors.DestaqueFIAP },
            ]}
            onPress={() => setMostrandoForm(true)}
          >
            <Text style={styles.actionButtonText}>
              Solicitar Entrada no Grupo
            </Text>
          </TouchableOpacity>
        )}

        {/* Form de envio de solicitacao */}
        {podeSolicitar && mostrandoForm && (
          <View
            style={[styles.formCard, { backgroundColor: colors.FundoCard }]}
          >
            <Text style={[styles.formTitle, { color: colors.TextoPrincipal }]}>
              Mensagem para o lider
            </Text>
            <Text style={[styles.formHint, { color: colors.TextoSecundario }]}>
              Explique brevemente o que voce pode contribuir
            </Text>
            <TextInput
              style={[
                styles.formInput,
                {
                  backgroundColor: colors.InputFundo,
                  color: colors.TextoPrincipal,
                  borderColor: colors.InputBorda,
                },
              ]}
              placeholder="Ex: Posso cobrir as disciplinas X e Y..."
              placeholderTextColor={colors.TextoSecundario}
              value={mensagem}
              onChangeText={setMensagem}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
            <View style={styles.formButtons}>
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  { borderColor: colors.TextoSecundario },
                ]}
                onPress={() => {
                  setMostrandoForm(false);
                  setMensagem("");
                }}
                disabled={enviando}
              >
                <Text
                  style={[
                    styles.cancelButtonText,
                    { color: colors.TextoSecundario },
                  ]}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  { backgroundColor: colors.DestaqueFIAP },
                  enviando && { opacity: 0.7 },
                ]}
                onPress={handleEnviarSolicitacao}
                disabled={enviando}
              >
                {enviando ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.sendButtonText}>Enviar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  backText: { fontSize: 16, fontWeight: "700" },
  groupCard: {
    margin: 16,
    padding: 18,
    borderRadius: 14,
    borderLeftWidth: 4,
  },
  groupName: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 10,
  },
  statusText: { color: "#FFF", fontSize: 11, fontWeight: "bold" },
  description: { fontSize: 14, lineHeight: 20, marginBottom: 14 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 6,
  },
  statBox: { alignItems: "center" },
  statValue: { fontSize: 22, fontWeight: "bold" },
  statLabel: { fontSize: 11, marginTop: 2 },
  section: { paddingHorizontal: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  subSection: { fontSize: 13, marginTop: 8, marginBottom: 6 },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  memberName: { fontSize: 15, fontWeight: "600" },
  memberRm: { fontSize: 12, marginTop: 2 },
  cargoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cargoText: { fontSize: 11, fontWeight: "bold" },
  disciplinasRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  disciplinaTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  disciplinaText: { fontSize: 12, fontWeight: "700" },
  actionButton: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  infoBox: {
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 3,
  },
  formCard: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
  },
  formTitle: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  formHint: { fontSize: 12, marginBottom: 10 },
  formInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    textAlignVertical: "top",
    minHeight: 90,
  },
  formButtons: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  cancelButtonText: { fontWeight: "700" },
  sendButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  sendButtonText: { color: "#FFF", fontWeight: "bold" },
});

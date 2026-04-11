// app/chat/[id].tsx
import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { chats } from "../chats"; // chats.ts está na pasta pai `app/`

const Colors = {
  FundoEscuro: "#000000",
  DestaqueFIAP: "#F23064",
  TextoClaro: "#FFFFFF",
  TextoNeutro: "#8C8C8C",
  LinhaDiv: "#2a2a2a",
};

type Msg = {
  id: string;
  text: string;
  fromMe: boolean;
};

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const listRef = useRef<FlatList<Msg>>(null);

  // pega o contato pelo id
  const chat = useMemo(() => {
    return (chats as any[]).find((c) => String(c.id) === String(id));
  }, [id]);

  // mensagens de exemplo do mock
  const [messages, setMessages] = useState<Msg[]>([
    { id: "m1", text: "Ainda tem um lugar no grupo ?", fromMe: true },
    { id: "m2", text: "Bom dia, tudo bem ?", fromMe: false },
    {
      id: "m3",
      text: "Temos sim mano, qual área voce mais tem facilidade ?",
      fromMe: false,
    },
    { id: "m4", text: "Oi, tudo bem sim!", fromMe: true },
    { id: "m5", text: "Tenho facilidade em Mobile e Java", fromMe: true },
    {
      id: "m6",
      text: "blzz, nos vamos conversando mais para se entender",
      fromMe: false,
    },
    {
      id: "m7",
      text: "vou falar com o outro integrante do grupo e ja te retorno",
      fromMe: false,
    },
    { id: "m8", text: "Tranquilo", fromMe: true },
  ]);

  const [input, setInput] = useState("");

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    const newMsg: Msg = {
      id: String(Date.now()),
      text: txt,
      fromMe: true,
    };
    setMessages((old) => [...old, newMsg]);
    setInput("");
    // rolar pro fim
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 80);
  };

  const getAvatarSource = (avatar?: any) => {
    if (!avatar) return require("../../assets/images/ConexãoAnjo.png");
    if (typeof avatar === "string") return { uri: avatar };
    return avatar;
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        {/* Botão voltar: seta + texto */}
        <TouchableOpacity
          onPress={() =>
            router.push((`/conversations` as unknown) as Parameters<
              typeof router.push
            >[0])
          }
          hitSlop={12}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={styles.backArrow}>{"<"}</Text>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.headerMid}>
          <Image
            source={getAvatarSource(chat?.avatar)}
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerName}>{chat?.name ?? "Contato"}</Text>
            <Text style={styles.headerStatus}>
              {chat?.online === false ? "Offline" : "Online"}
            </Text>
          </View>
        </View>

        {/* espaço para balancear */}
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.divider} />

      {/* Lista de mensagens */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContent}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubbleRow,
                item.fromMe ? styles.bubbleRowRight : styles.bubbleRowLeft,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  item.fromMe ? styles.bubbleMe : styles.bubbleThem,
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    item.fromMe ? styles.bubbleTextMe : styles.bubbleTextThem,
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          )}
        />

        {/* Barra de envio (rosa) */}
        <View style={styles.inputBar}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Mensagem..."
              placeholderTextColor={Colors.TextoNeutro}
              value={input}
              onChangeText={setInput}
              style={styles.textInput}
              multiline
            />
            <TouchableOpacity onPress={send} hitSlop={10}>
              <Text style={styles.sendIcon}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.FundoEscuro,
  },

  // Header
  header: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backArrow: {
    color: Colors.DestaqueFIAP,
    fontSize: 18,
    fontWeight: "700",
    width: 24,
    textAlign: "left",
  },
  headerMid: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  headerName: {
    color: Colors.TextoClaro,
    fontSize: 16,
    fontWeight: "700",
  },
  headerStatus: {
    color: "#2bf04a",
    fontSize: 12,
    marginTop: 2,
  },
  backText: {
    color: Colors.TextoClaro,
    fontSize: 14,
    marginLeft: 6,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.LinhaDiv,
  },

  // Chat list
  chatContent: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    paddingBottom: 110, // espaço para a barra de envio
  },
  bubbleRow: {
    flexDirection: "row",
    marginVertical: 6,
    paddingHorizontal: 6,
  },
  bubbleRowLeft: {
    justifyContent: "flex-start",
  },
  bubbleRowRight: {
    justifyContent: "flex-end",
  },
  bubble: {
    maxWidth: "78%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  bubbleMe: {
    backgroundColor: Colors.DestaqueFIAP,
  },
  bubbleThem: {
    backgroundColor: "#1a1a1a",
  },
  bubbleText: {
    fontSize: 14,
  },
  bubbleTextMe: {
    color: Colors.TextoClaro,
  },
  bubbleTextThem: {
    color: Colors.TextoNeutro,
  },

  // Input bar
  inputBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    backgroundColor: Colors.FundoEscuro,
    borderTopWidth: 1,
    borderTopColor: Colors.LinhaDiv,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  textInput: {
    flex: 1,
    color: Colors.TextoClaro,
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 8,
    maxHeight: 120,
  },
  sendIcon: {
    color: Colors.DestaqueFIAP,
    fontSize: 20,
    marginLeft: 8,
  },
});

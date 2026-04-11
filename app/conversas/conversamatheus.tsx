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
import { useRouter } from "expo-router";
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

export default function ConversaMatheus() {
  const router = useRouter();
  const listRef = useRef<FlatList<Msg>>(null);

  // Dados do contato
  const contact = {
    id: "matheus-silva",
    name: "Matheus Silva",
  avatar: require('../../assets/images/perfil.png'),
    online: false,
  };

  // mensagens de exemplo
  const [messages, setMessages] = useState<Msg[]>([
    { id: "m1", text: "Oi Matheus, como está o projeto?", fromMe: true },
    { id: "m2", text: "Oi! Está indo bem, estou terminando a documentação", fromMe: false },
    { id: "m3", text: "Que bom! Precisa de ajuda?", fromMe: true },
    { id: "m4", text: "Por enquanto não, obrigado!", fromMe: false },
    { id: "m5", text: "Ok, qualquer coisa me avisa", fromMe: true },
    { id: "m6", text: "...", fromMe: false },
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
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 80);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.push('/conversations')} 
          style={styles.backButton}
          hitSlop={12}
        >
          <Text style={styles.backArrow}>{"<"}</Text>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.headerMid}>
          <Image
            source={contact.avatar}
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerName}>{contact.name}</Text>
            <Text style={[styles.headerStatus, !contact.online && styles.offline]}>
              {contact.online ? "Online" : "Offline"}
            </Text>
          </View>
        </View>

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

        {/* Barra de envio */}
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backArrow: {
    color: Colors.DestaqueFIAP,
    fontSize: 18,
    fontWeight: "700",
  },
  backText: {
    color: Colors.DestaqueFIAP,
    fontSize: 16,
    fontWeight: "600",
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
  offline: {
    color: Colors.TextoNeutro,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.LinhaDiv,
  },

  // Chat list
  chatContent: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    paddingBottom: 110,
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
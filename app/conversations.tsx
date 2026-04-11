import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { chats } from "./chats";
import { useTheme } from "../src/contexts/ThemeContext";

// Tipagem de cada item de conversa
interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  lastTime: string;
  avatar: any;
}

export default function ConversationsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [search, setSearch] = useState("");

  // Filtra conversas com base na busca do usuario
  const filteredChats = useMemo<ChatItem[]>(() => {
    if (!search.trim()) return chats as ChatItem[];
    return (chats as ChatItem[]).filter((c: ChatItem) =>
      c.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search]);

  const handleBack = useCallback(() => {
    router.replace("/dashboard");
  }, [router]);

  // Abre a conversa individual baseado no id
  const openChat = useCallback(
    (id: string) => {
      // Mapeamento de IDs para rotas das conversas existentes
      const chatRoutes: { [key: string]: string } = {
        'conexao-anjo': '/conversas/conversagrupanjo',
        'gabriel-furlan': '/conversas/conversagabriel',
        'marco-volpi': '/conversas/conversamarco',
        'matheus-silva': '/conversas/conversamatheus',
        'cleiton-de-souza': '/conversas/conversacleiton',
        'via-mobility': '/conversas/conversaviamobility'
      };

      if (chatRoutes[id]) {
        router.push((chatRoutes[id] as unknown) as Parameters<typeof router.push>[0]);
        return;
      }

      router.push((`/chat/${id}` as unknown) as Parameters<typeof router.push>[0]);
    },
    [router]
  );

  // Renderiza cada conversa na lista
  const renderItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      style={[styles.chatRow, { backgroundColor: colors.FundoPrincipal }]}
      onPress={() => openChat(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.chatLeft}>
        <Image
          source={item.avatar ? item.avatar : require('../assets/images/perfil.png')}
          style={styles.avatar}
        />
        <View style={styles.chatTextContainer}>
          <Text style={[styles.chatName, { color: colors.TextoPrincipal }]}>{item.name}</Text>
          <Text style={[styles.chatLastMsg, { color: colors.TextoSecundario }]} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
      </View>
      <Text style={[styles.chatTime, { color: colors.TextoPrincipal }]}>{item.lastTime}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.FundoPrincipal }]}>
      {/* Header com botao voltar e titulo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} hitSlop={15}>
          <Text style={[styles.backArrow, { color: colors.DestaqueFIAP }]}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.TextoPrincipal }]}>Conversas</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Campo de busca */}
      <View style={styles.searchWrapper}>
        <View style={[styles.searchBox, { backgroundColor: colors.FundoCard }]}>
          <TextInput
            placeholder="Pesquise..."
            placeholderTextColor={colors.TextoSecundario}
            style={[styles.searchInput, { color: colors.TextoPrincipal }]}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Lista de conversas */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={[styles.list, { backgroundColor: colors.FundoPrincipal }]}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: colors.Divisor }} />
        )}
      />

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
  searchWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchBox: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  chatRow: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    paddingRight: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  chatTextContainer: {
    flexShrink: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  chatLastMsg: {
    fontSize: 14,
  },
  chatTime: {
    fontSize: 12,
    fontWeight: "400",
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
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

const Colors = {
  FundoEscuro: "#000000",
  DestaqueFIAP: "#F23064",
  TextoClaro: "#FFFFFF",
  TextoNeutro: "#8C8C8C",
  LinhaDiv: "#2a2a2a",
};

export default function ConversationsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  
  interface ChatItem {
    id: string;
    name: string;
    lastMessage: string;
    lastTime: string;
    avatar: any;
  }
  

  // filtro de busca
  const filteredChats = useMemo<ChatItem[]>(() => {
    if (!search.trim()) return chats as ChatItem[];
    return (chats as ChatItem[]).filter((c: ChatItem) =>
      c.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search]);

  // botão voltar no topo
  const handleBack = useCallback(() => {
    // aqui você controla ONDE quer voltar
    // se essa tela de conversas faz parte da navegação principal,
    // e você quer voltar pro dashboard:
    router.replace("/dashboard");
    // se quiser só "voltar 1 tela":
    // router.back();
  }, [router]);

  // abrir chat individual
  const openChat = useCallback(
    (id: string) => {
      // Mapeamento de IDs para rotas específicas (agora dentro da pasta conversas)
      const chatRoutes: { [key: string]: string } = {
        'conexao-anjo': '/conversas/conversagrupanjo',
        'gabriel-furlan': '/conversas/conversagabriel',
        'marco-volpi': '/conversas/conversamarco',
        'matheus-silva': '/conversas/conversamatheus',
        'cleiton-de-souza': '/conversas/conversacleiton',
        'via-mobility': '/conversas/conversaviamobility'
      };

      // Se houver uma rota específica para este ID, use-a
      if (chatRoutes[id]) {
        router.push((chatRoutes[id] as unknown) as Parameters<typeof router.push>[0]);
        return;
      }

      // Fallback para rota genérica
      router.push((`/chat/${id}` as unknown) as Parameters<typeof router.push>[0]);
    },
    [router]
  );

  // render de cada conversa na lista
  const renderItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      style={styles.chatRow}
      onPress={() => openChat(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.chatLeft}>
        {/* se não houver avatar, usa o placeholder perfil.png */}
        <Image source={item.avatar ? item.avatar : require('../assets/images/perfil.png')} style={styles.avatar} />

        <View style={styles.chatTextContainer}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatLastMsg} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
      </View>

      <Text style={styles.chatTime}>{item.lastTime}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header + busca */}
      <View style={styles.header}>
        {/* botão voltar */}
        <TouchableOpacity onPress={handleBack} hitSlop={15}>
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Conversas</Text>

        {/* só pra ocupar espaço e centralizar o título */}
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Pesquise..."
            placeholderTextColor={Colors.TextoNeutro}
            style={styles.searchInput}
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
        style={styles.list}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: Colors.LinhaDiv }} />
        )}
      />

      {/* Bottom nav fixo */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.replace('/dashboard')} style={styles.navItem}>
          <Image
            source={require('../assets/images/MaskGrup.png')}
            style={[styles.navIconImage, { tintColor: Colors.DestaqueFIAP }]}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/conversations')} style={styles.navItem}>
          <Image
            source={require('../assets/images/mensagem.png')}
            style={styles.navIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/profilepage')} style={styles.navItem}>
          <Image
            source={require('../assets/images/perfil.png')}
            style={styles.navIconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      
    </SafeAreaView>
  );
}

// estilos
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.FundoEscuro,
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
    color: Colors.DestaqueFIAP,
    fontSize: 20,
    fontWeight: "600",
    width: 24,
    textAlign: "left",
  },

  title: {
    color: Colors.TextoClaro,
    fontSize: 22,
    fontWeight: "600",
  },

  searchWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  searchBox: {
    backgroundColor: "#1a1a1a",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  searchIcon: {
    color: Colors.DestaqueFIAP,
    fontSize: 16,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    color: Colors.TextoClaro,
    fontSize: 16,
  },

  list: {
    flex: 1,
    backgroundColor: Colors.FundoEscuro,
  },

  chatRow: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.FundoEscuro,
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
    color: Colors.TextoClaro,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },

  chatLastMsg: {
    color: Colors.TextoNeutro,
    fontSize: 14,
  },

  chatTime: {
    color: Colors.TextoClaro,
    fontSize: 12,
    fontWeight: "400",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: Colors.LinhaDiv,
    paddingVertical: 12,
    backgroundColor: Colors.FundoEscuro,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navIcon: {
    fontSize: 22,
    color: Colors.DestaqueFIAP,
    textAlign: "center",
  },
  navIconImage: {
    width: 26,
    height: 26,
  },
});

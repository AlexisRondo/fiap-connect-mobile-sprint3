import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../src/contexts/AuthContext';
import { useTheme } from '../src/contexts/ThemeContext';
import { buscarGruposCompativeis, GrupoCompativel } from '../src/services/apexApi';

const GruposIcon = require('../assets/images/MaskGrup.png');

export default function SearchPage() {
  const router = useRouter();
  const { getRm } = useAuth();
  const { colors } = useTheme();
  const rm = getRm() || '';

  const { data: grupos, isLoading, error, refetch } = useQuery({
    queryKey: ['grupos-compativeis', rm],
    queryFn: () => buscarGruposCompativeis(rm),
    enabled: !!rm,
  });

  const goBack = () => {
    router.replace('/dashboard');
  };

  const getCompatibilidadeCor = (percentual: number): string => {
    if (percentual >= 80) return '#27AE60';
    if (percentual >= 50) return '#F39C12';
    return '#E74C3C';
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.FundoPrincipal }]}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

        <View style={[styles.topBar, { backgroundColor: colors.FundoCard, borderColor: colors.DestaqueFIAP + '30' }]}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text style={[styles.backText, { color: colors.DestaqueFIAP }]}>{'< Voltar'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.TextoPrincipal }]}>Buscar Grupos</Text>
          <Text style={[styles.headerSubtitle, { color: colors.TextoSecundario }]}>
            Grupos compativeis com suas habilidades ({rm})
          </Text>
        </View>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.DestaqueFIAP} />
            <Text style={[styles.loadingText, { color: colors.TextoSecundario }]}>Buscando grupos...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: colors.DestaqueFIAP }]}>Erro ao buscar grupos.</Text>
            <TouchableOpacity style={[styles.retryButton, { backgroundColor: colors.DestaqueFIAP }]} onPress={() => refetch()}>
              <Text style={styles.retryText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        )}

        {grupos && grupos.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.TextoSecundario }]}>
              Nenhum grupo compativel encontrado.
            </Text>
          </View>
        )}

        {grupos && grupos.length > 0 && (
          <View style={styles.resultsList}>
            {grupos.map((grupo: GrupoCompativel) => (
              <View
                key={grupo.id_grupo}
                style={[styles.resultCard, { backgroundColor: colors.FundoCard, borderColor: getCompatibilidadeCor(grupo.percentual_compatibilidade) }]}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.logoContainer, { backgroundColor: colors.FundoPrincipal }]}>
                    <Image source={GruposIcon} style={[styles.resultLogo, { tintColor: colors.DestaqueFIAP }]} resizeMode="contain" />
                  </View>
                  <View style={styles.cardHeaderText}>
                    <Text style={[styles.cardTitle, { color: colors.TextoPrincipal }]}>{grupo.nome_grupo}</Text>
                    <Text style={[styles.cardStatus, { color: colors.TextoSecundario }]}>{grupo.status_grupo}</Text>
                  </View>
                  <View style={[styles.compatBadge, { backgroundColor: getCompatibilidadeCor(grupo.percentual_compatibilidade) }]}>
                    <Text style={styles.compatText}>{grupo.percentual_compatibilidade}%</Text>
                  </View>
                </View>

                <Text style={[styles.cardDescription, { color: colors.TextoSecundario }]} numberOfLines={2}>
                  {grupo.descricao_projeto}
                </Text>

                <View style={styles.cardInfo}>
                  <Text style={[styles.infoText, { color: colors.TextoSecundario }]}>
                    Membros: {grupo.total_membros}/{grupo.max_integrantes}
                  </Text>
                  <Text style={[styles.infoText, { color: colors.TextoSecundario }]}>
                    Vagas: {grupo.vagas_disponiveis}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.TabBar, borderColor: colors.DestaqueFIAP + '40' }]}>
        <TouchableOpacity onPress={() => router.replace('/dashboard')} style={styles.footerItem}>
          <Image source={require('../assets/images/MaskGrup.png')} style={[styles.footerIcon, { tintColor: colors.DestaqueFIAP }]} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/conversations')} style={styles.footerItem}>
          <Image source={require('../assets/images/mensagem.png')} style={[styles.footerIcon, { tintColor: colors.TextoSecundario }]} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/profilepage')} style={styles.footerItem}>
          <Image source={require('../assets/images/perfil.png')} style={[styles.footerIcon, { tintColor: colors.TextoSecundario }]} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
  },
  backButton: {
    paddingVertical: 10,
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
  },
  header: {
    paddingHorizontal: 26,
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 5,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 15,
  },
  retryButton: {
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 30,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
  },
  resultsList: {
    marginHorizontal: 20,
  },
  resultCard: {
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoContainer: {
    padding: 8,
    borderRadius: 10,
    marginRight: 12,
  },
  resultLogo: {
    width: 30,
    height: 30,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  cardStatus: {
    fontSize: 12,
    marginTop: 2,
  },
  compatBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  compatText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  footerItem: {
    padding: 10,
  },
  footerIcon: {
    width: 26,
    height: 26,
  },
});
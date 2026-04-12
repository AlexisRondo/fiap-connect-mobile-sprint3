import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { useTheme } from '../src/contexts/ThemeContext';

// Componente reutilizavel para campos editaveis
interface EditableInputProps {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  showToggle?: boolean;
  colors: any;
}

const EditableInput: React.FC<EditableInputProps> = ({ label, value, onChangeText, secureTextEntry, keyboardType, showToggle, colors }) => {
  const [isSecure, setIsSecure] = useState(!!secureTextEntry);
  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: colors.TextoSecundario }]}>{label}</Text>
      <View style={[styles.inputWrapper, { backgroundColor: colors.InputFundo, borderColor: colors.InputBorda }]}>
        <TextInput
          style={[styles.input, { color: colors.TextoPrincipal }]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          placeholderTextColor={colors.TextoSecundario}
        />
        {showToggle && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.toggleButton}>
            <Text style={{ color: colors.DestaqueFIAP, fontSize: 14 }}>{isSecure ? 'Ver' : 'Ocultar'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function AccountSettingsPage() {
  const router = useRouter();
  const { user, getRm } = useAuth();
  const { colors } = useTheme();

  // Dados do usuario logado via Firebase
  const [name, setName] = useState(getRm() || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const goBack = () => (router.canGoBack() ? router.back() : router.push('/profilepage'));
  const handleSave = () => alert('Configuracoes salvas com sucesso!');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.FundoPrincipal }]}>
      <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 120 }]}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={[styles.backText, { color: colors.TextoPrincipal }]}>{'< Voltar'}</Text>
        </TouchableOpacity>

        <Text style={[styles.pageTitle, { color: colors.TextoPrincipal }]}>Configuracoes da Conta</Text>

        {/* Placeholder de foto de perfil */}
        <View style={styles.photoSection}>
          <View style={[styles.profileImageBorder, { borderColor: colors.DestaqueFIAP }]}>
            <View style={[styles.profileImagePlaceholder, { backgroundColor: colors.FundoCard }]}>
              <Text style={{ fontSize: 40, color: colors.TextoSecundario }}>?</Text>
            </View>
          </View>
        </View>

        {/* Secao de dados de acesso */}
        <View style={[styles.sectionCard, { backgroundColor: colors.FundoCard }]}>
          <Text style={[styles.sectionTitle, { color: colors.TextoPrincipal }]}>Dados de Acesso</Text>
          <EditableInput label="Nome / RM" value={name} onChangeText={setName} colors={colors} />
          <EditableInput label="E-mail Institucional" value={email} onChangeText={setEmail} keyboardType="email-address" colors={colors} />
          <EditableInput label="Alterar Senha" value={password} onChangeText={setPassword} secureTextEntry showToggle colors={colors} />
        </View>

        {/* Secao de privacidade de contato */}
        <View style={[styles.sectionCard, { backgroundColor: colors.FundoCard }]}>
          <Text style={[styles.sectionTitle, { color: colors.TextoPrincipal }]}>Visualizacao de Contato</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.TextoSecundario }]}>Controle quais dados sao visiveis apos um Match.</Text>

          <TouchableOpacity style={styles.privacyOption} onPress={() => setShowEmail(!showEmail)}>
            <View style={[styles.checkbox, showEmail && { backgroundColor: colors.DestaqueFIAP, borderColor: colors.DestaqueFIAP }]} />
            <Text style={[styles.privacyText, { color: colors.TextoPrincipal }]}>Tornar E-mail visivel</Text>
          </TouchableOpacity>

          <EditableInput label="Telefone/WhatsApp" value={phone} onChangeText={setPhone} keyboardType="numeric" colors={colors} />
          <TouchableOpacity style={styles.privacyOption} onPress={() => setShowPhone(!showPhone)}>
            <View style={[styles.checkbox, showPhone && { backgroundColor: colors.DestaqueFIAP, borderColor: colors.DestaqueFIAP }]} />
            <Text style={[styles.privacyText, { color: colors.TextoPrincipal }]}>Tornar Telefone visivel</Text>
          </TouchableOpacity>
        </View>

        {/* Botao salvar */}
        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.DestaqueFIAP }]} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Alteracoes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Navegacao inferior */}
      <View style={[styles.tabBar, { backgroundColor: colors.TabBar, borderColor: colors.DestaqueFIAP }]}>
        <TouchableOpacity onPress={() => router.push('/searchpage')} style={styles.tabItem}>
          <Text style={[styles.tabLabel, { color: colors.TextoSecundario }]}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/conversations')} style={styles.tabItem}>
          <Text style={[styles.tabLabel, { color: colors.TextoSecundario }]}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/profilepage')} style={styles.tabItem}>
          <Text style={[styles.tabLabel, { color: colors.DestaqueFIAP }]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { paddingHorizontal: 16, paddingTop: 40 },
  backButton: { paddingVertical: 8, marginBottom: 4 },
  backText: { fontSize: 14, fontWeight: '600' },
  pageTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  photoSection: { alignItems: 'center', marginBottom: 16 },
  profileImageBorder: { borderWidth: 2, borderRadius: 60, padding: 3 },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  sectionSubtitle: { fontSize: 12, marginBottom: 10 },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
  inputWrapper: {
    borderRadius: 8,
    borderWidth: 1,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: { flex: 1, paddingHorizontal: 12, fontSize: 14 },
  toggleButton: { paddingHorizontal: 10 },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#555',
    marginRight: 10,
  },
  privacyText: { fontSize: 14 },
  saveButton: {
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  saveButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  tabItem: { padding: 8 },
  tabLabel: { fontSize: 13, fontWeight: '600' },
});
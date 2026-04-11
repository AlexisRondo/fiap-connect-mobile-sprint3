import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

// Clean compact account settings page for iPhone 16: reduced paddings, fonts and image size.

const Colors = {
  FundoEscuro: '#000000',
  DestaqueFIAP: '#F23064',
  TextoClaro: '#FFFFFF',
  TextoNeutro: '#8C8C8C',
  CardFundo: '#1A1A1A',
  InputFundo: 'rgba(255, 255, 255, 0.06)',
};

interface EditableInputProps {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  showToggle?: boolean;
}

const EditableInput: React.FC<EditableInputProps> = ({ label, value, onChangeText, secureTextEntry, keyboardType, showToggle }) => {
  const [isSecure, setIsSecure] = useState(!!secureTextEntry);
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          placeholderTextColor={Colors.TextoNeutro}
        />
        {showToggle && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.toggleButton}>
            <Text style={{ color: Colors.DestaqueFIAP, fontSize: 14 }}>{isSecure ? '👁️' : '🔒'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function AccountSettingsPage() {
  const router = useRouter();
  const [name, setName] = useState('Gabriel Gonçalves');
  const [email, setEmail] = useState('RM561029@fiap.com');
  const [phone, setPhone] = useState('(11) 99876-5432');
  const [password, setPassword] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const goBack = () => (router.canGoBack() ? router.back() : router.push('/profilepage'));
  const handleSave = () => alert('Configurações salvas com sucesso!');


  type BottomDest = 'searchpage' | 'conversations' | 'profilepage' | 'dashboard';
  const handleNavigation = (dest: BottomDest) => {
    router.push((`/${dest}` as unknown) as Parameters<typeof router.push>[0]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 120 }]}> 
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backText}>{'< Voltar'}</Text>
        </TouchableOpacity>

        <Text style={styles.pageTitle}>Configurações da Conta</Text>

        <View style={styles.photoSection}>
          <View style={styles.profileImageBorder}>
            <Image source={require('../assets/images/eu2.jpg')} style={styles.profileImage} />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Dados de Acesso</Text>
          <EditableInput label="Nome Completo" value={name} onChangeText={setName} />
          <EditableInput label="E-mail Institucional" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <EditableInput label="Alterar Senha" value={password} onChangeText={setPassword} secureTextEntry showToggle />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Visualização de Contato</Text>
          <Text style={styles.sectionSubtitle}>Controle quais dados são visíveis após um Match.</Text>

          <TouchableOpacity style={styles.privacyOption} onPress={() => setShowEmail(!showEmail)}>
            <View style={[styles.checkbox, showEmail && styles.checkboxActive]} />
            <Text style={styles.privacyText}>Tornar E-mail visível</Text>
          </TouchableOpacity>

          <EditableInput label="Telefone/WhatsApp" value={phone} onChangeText={setPhone} keyboardType="numeric" />
          <TouchableOpacity style={styles.privacyOption} onPress={() => setShowPhone(!showPhone)}>
            <View style={[styles.checkbox, showPhone && styles.checkboxActive]} />
            <Text style={styles.privacyText}>Tornar Telefone visível</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SALVAR</Text>
        </TouchableOpacity>

        <View style={{ height: 48 }} />
      </ScrollView>

      {/* Barra de navegação inferior */}
      <View style={[styles.bottomNav, { paddingBottom: Platform.OS === 'ios' ? 24 : 12 }]}> 
        <TouchableOpacity onPress={() => handleNavigation('searchpage')} style={styles.navItem}>
          <Image source={require('../assets/images/MaskGrup.png')} style={styles.navIconImage} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigation('conversations')} style={styles.navItem}>
          <Image source={require('../assets/images/mensagem.png')} style={styles.navIconImage} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleNavigation('profilepage')} style={styles.navItem}>
          <Image source={require('../assets/images/perfil.png')} style={styles.navIconImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Layout
  safeArea: {
    flex: 1,
    backgroundColor: Colors.FundoEscuro,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },

  // Header
  backButton: {
    paddingVertical: 6,
    marginBottom: 8,
  },
  backText: {
    color: Colors.TextoClaro,
    fontSize: 14,
    fontWeight: '600',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.TextoClaro,
    marginBottom: 16,
    textAlign: 'center',
  },

  // Profile Photo
  photoSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageBorder: {
    borderRadius: 48,
    borderWidth: 2,
    padding: 2,
    marginBottom: 8,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  // Cards
  sectionCard: {
    backgroundColor: Colors.CardFundo,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.DestaqueFIAP,
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.TextoNeutro,
    marginBottom: 10,
  },

  // Inputs
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: Colors.TextoClaro,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.InputFundo,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.TextoNeutro + '20',
    height: 42,
  },
  input: {
    color: Colors.TextoClaro,
    paddingHorizontal: 10,
    fontSize: 14,
    flex: 1,
  },
  toggleButton: {
    padding: 8,
  },

  // Privacy
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  privacyText: {
    color: Colors.TextoNeutro,
    fontSize: 13,
    marginLeft: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.TextoNeutro,
  },
  checkboxActive: {
    backgroundColor: Colors.DestaqueFIAP,
    borderColor: Colors.DestaqueFIAP,
  },

  // Save Button
  saveButton: {
    backgroundColor: Colors.DestaqueFIAP,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  saveButtonText: {
    color: Colors.TextoClaro,
    fontSize: 15,
    fontWeight: '700',
  },
  // Bottom navigation (shared style with Dashboard)
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: Colors.InputFundo,
    paddingVertical: 12,
    backgroundColor: Colors.FundoEscuro,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIconImage: {
    width: 28,
    height: 28,
  },
});

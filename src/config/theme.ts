// cores centralizadas com tema claro e escuro

export const LightTheme = {
  FundoPrincipal: '#FFFFFF',
  FundoCard: '#F2F2F2',
  TextoPrincipal: '#1A1A1A',
  TextoSecundario: '#666666',
  DestaqueFIAP: '#F23064',
  InputFundo: 'rgba(0, 0, 0, 0.05)',
  InputBorda: '#CCCCCC',
  Divisor: '#E0E0E0',
  TabBar: '#F5F5F5',
};

export const DarkTheme = {
  FundoPrincipal: '#000000',
  FundoCard: '#1A1A1A',
  TextoPrincipal: '#FFFFFF',
  TextoSecundario: '#8C8C8C',
  DestaqueFIAP: '#F23064',
  InputFundo: 'rgba(255, 255, 255, 0.1)',
  InputBorda: '#333333',
  Divisor: '#2A2A2A',
  TabBar: '#1A1A1A',
};

export type ThemeColors = typeof DarkTheme;
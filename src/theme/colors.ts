// Datinsight Brand Colors - Professional 3-Color Palette

export const Colors = {
  // Primary Brand Color - Deep Ocean Blue (Professional, trustworthy)
  primary: '#0F4C81',
  primaryLight: '#1565A0',
  primaryDark: '#0A3D66',
  primaryBg: '#E3F2FD',
  
  // Secondary Brand Color - Coral/Salmon (Engaging, modern)
  accent: '#FF6B6B',
  accentLight: '#FF8787',
  accentDark: '#EE5A5A',
  accentBg: '#FFE5E5',
  
  // Tertiary Color - Warm Gold (Premium, intelligent)
  tertiary: '#F4A261',
  tertiaryLight: '#F5B57E',
  tertiaryDark: '#E8954E',
  tertiaryBg: '#FFF4E6',
  
  // Neutrals
  background: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  
  // Text
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  
  // Status Colors (using main palette)
  success: '#0F4C81',  // Primary blue
  warning: '#F4A261',  // Gold
  error: '#FF6B6B',    // Coral
  info: '#1565A0',     // Light primary
  
  // Overlays
  overlay: 'rgba(15, 76, 129, 0.05)',
  overlayDark: 'rgba(15, 76, 129, 0.1)',
};

// Type helpers
export const getTypeColor = (type: 'news' | 'social' | 'podcast') => {
  switch (type) {
    case 'news': return Colors.primary;
    case 'social': return Colors.accent;
    case 'podcast': return Colors.tertiary;
    default: return Colors.textSecondary;
  }
};

export const getBiasColor = (bias: string) => {
  switch (bias) {
    case 'left': return '#1565A0';
    case 'right': return '#FF6B6B';
    case 'center': return '#0F4C81';
    case 'mixed': return '#F4A261';
    default: return Colors.textSecondary;
  }
};


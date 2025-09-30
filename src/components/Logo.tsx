import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function Logo({ size = 'medium', showText = true }: LogoProps) {
  const dimensions = {
    small: { logoSize: 32, fontSize: 14, textSize: 12 },
    medium: { logoSize: 48, fontSize: 20, textSize: 14 },
    large: { logoSize: 80, fontSize: 32, textSize: 18 },
  };

  const { logoSize, fontSize, textSize } = dimensions[size];

  return (
    <View style={styles.container}>
      <View style={[styles.logoContainer, { width: logoSize, height: logoSize }]}>
        <View style={styles.letterContainer}>
          <Text style={[styles.letterD, { fontSize }]}>D</Text>
          <Text style={[styles.letterT, { fontSize }]}>T</Text>
        </View>
      </View>
      {showText && (
        <Text style={[styles.brandText, { fontSize: textSize }]}>Datinsight</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  letterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  letterD: {
    color: '#FFFFFF',
    fontWeight: '900',
    letterSpacing: -2,
  },
  letterT: {
    color: Colors.accent,
    fontWeight: '900',
    letterSpacing: -2,
  },
  brandText: {
    marginTop: 8,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
  },
});


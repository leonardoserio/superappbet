import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/design-system';
import { SDUIRenderer } from '@/components/sdui/SDUIRenderer';

export const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();

  const FallbackComponent = () => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: 16,
        textAlign: 'center',
      },
      subtitle: {
        fontSize: 16,
        color: theme.colors.text.secondary,
        textAlign: 'center',
        lineHeight: 24,
      },
    });

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil do Usuário</Text>
        <Text style={styles.subtitle}>
          Configurações, histórico e informações da conta
        </Text>
      </View>
    );
  };

  return (
    <SDUIRenderer
      screenName="profile"
      userId="user123" // In production, get from auth context
      fallbackComponent={FallbackComponent}
      onScreenLoad={(config) => {
        console.log('👤 Profile screen loaded:', config.layout.type);
      }}
      onError={(error) => {
        console.error('👤 Profile screen error:', error);
      }}
    />
  );
};
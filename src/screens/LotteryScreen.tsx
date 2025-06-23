import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/design-system';
import { SDUIRenderer } from '@/components/sdui/SDUIRenderer';

export const LotteryScreen: React.FC = () => {
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
        <Text style={styles.title}>Módulo Loteria</Text>
        <Text style={styles.subtitle}>
          Loterias nacionais, sorteios e prêmios incríveis!
        </Text>
      </View>
    );
  };

  return (
    <SDUIRenderer
      screenName="lottery"
      fallbackComponent={FallbackComponent}
      onScreenLoad={(config) => {
        console.log('🎟️ Lottery screen loaded:', config.layout?.type || 'unknown');
      }}
      onError={(error) => {
        console.error('🎟️ Lottery screen error:', error);
      }}
    />
  );
};
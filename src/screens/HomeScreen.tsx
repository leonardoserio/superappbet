import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/design-system';
import { SDUIRenderer } from '@/components/sdui/SDUIRenderer';

export const HomeScreen: React.FC = () => {
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
        <Text style={styles.title}>Welcome to SuperAppBet</Text>
        <Text style={styles.subtitle}>
          Your one-stop destination for sports betting, casino games, and more!
        </Text>
      </View>
    );
  };

  return (
    <SDUIRenderer
      screenName="home"
      fallbackComponent={FallbackComponent}
      onScreenLoad={(config) => {
        console.log('🏠 Home screen loaded:', config.layout.type);
      }}
      onError={(error) => {
        console.error('🏠 Home screen error:', error);
      }}
    />
  );
};
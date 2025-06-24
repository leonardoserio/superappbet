import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/design-system';

import { LiveIcon, BetSlipIcon, WalletIcon } from '@/components/shared/Icon';
import { SDUIRenderer } from '@/components/sdui/SDUIRenderer';

export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();

  const FallbackComponent = () => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background.secondary,
      },
      header: {
        backgroundColor: theme.colors.background.primary,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      welcomeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      welcomeText: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.text.primary,
      },
      balanceContainer: {
        alignItems: 'flex-end',
      },
      balanceLabel: {
        fontSize: 12,
        color: theme.colors.text.tertiary,
        textTransform: 'uppercase',
      },
      balanceValue: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.interactive.primary,
      },
      quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
      },
      quickAction: {
        flex: 1,
        marginHorizontal: 4,
        backgroundColor: theme.colors.background.tertiary,
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      quickActionText: {
        marginLeft: 8,
        fontSize: 13,
        fontWeight: '600',
        color: theme.colors.text.primary,
      },
      scrollContent: {
        flex: 1,
        padding: 16,
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: 16,
      },
      promotionCard: {
        borderRadius: 16,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      promotionGradient: {
        padding: 24,
        minHeight: 140,
        justifyContent: 'center',
      },
      promotionTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: 8,
      },
      promotionSubtitle: {
        fontSize: 16,
        color: '#ffffff',
        opacity: 0.9,
        marginBottom: 16,
      },
      promotionButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
      },
      promotionButtonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 14,
      },
      quickBetsContainer: {
        marginBottom: 24,
      },
      quickBetCard: {
        backgroundColor: theme.colors.background.primary,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      matchHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
      },
      matchTime: {
        fontSize: 12,
        color: theme.colors.text.tertiary,
        fontWeight: '600',
      },
      liveIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.betting.live,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
      },
      liveText: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '700',
        marginLeft: 4,
      },
      teamsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
      },
      teamName: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.primary,
        flex: 1,
      },
      vsText: {
        fontSize: 14,
        color: theme.colors.text.tertiary,
        marginHorizontal: 12,
      },
      oddsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      oddButton: {
        flex: 1,
        backgroundColor: theme.colors.background.tertiary,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 2,
      },
      oddLabel: {
        fontSize: 12,
        color: theme.colors.text.tertiary,
        marginBottom: 4,
      },
      oddValue: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.interactive.primary,
      },
    });

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeRow}>
            <Text style={styles.welcomeText}>SuperAppBet</Text>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Saldo</Text>
              <Text style={styles.balanceValue}>R$ 1.250,00</Text>
            </View>
          </View>
          
          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <LiveIcon color={theme.colors.betting.live} size={18} />
              <Text style={styles.quickActionText}>Ao Vivo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <BetSlipIcon color={theme.colors.interactive.primary} size={18} />
              <Text style={styles.quickActionText}>Cupom</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <WalletIcon color={theme.colors.betting.cashout} size={18} />
              <Text style={styles.quickActionText}>Carteira</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Welcome Promotion */}
          <View style={styles.promotionCard}>
            <LinearGradient
              colors={[...theme.colors.gradients.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.promotionGradient}
            >
              <Text style={styles.promotionTitle}>Bônus de Boas-vindas!</Text>
              <Text style={styles.promotionSubtitle}>
                Ganhe até R$ 500 no seu primeiro depósito
              </Text>
              <TouchableOpacity style={styles.promotionButton}>
                <Text style={styles.promotionButtonText}>Depositar Agora</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Quick Bets */}
          <View style={styles.quickBetsContainer}>
            <Text style={styles.sectionTitle}>Apostas Rápidas</Text>
            
            {/* Sample Match 1 */}
            <View style={styles.quickBetCard}>
              <View style={styles.matchHeader}>
                <Text style={styles.matchTime}>Hoje, 20:00</Text>
                <View style={styles.liveIndicator}>
                  <LiveIcon color="#ffffff" size={12} />
                  <Text style={styles.liveText}>AO VIVO</Text>
                </View>
              </View>
              
              <View style={styles.teamsRow}>
                <Text style={styles.teamName}>Flamengo</Text>
                <Text style={styles.vsText}>vs</Text>
                <Text style={styles.teamName}>Palmeiras</Text>
              </View>
              
              <View style={styles.oddsRow}>
                <TouchableOpacity style={styles.oddButton}>
                  <Text style={styles.oddLabel}>Casa</Text>
                  <Text style={styles.oddValue}>2.10</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.oddButton}>
                  <Text style={styles.oddLabel}>Empate</Text>
                  <Text style={styles.oddValue}>3.20</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.oddButton}>
                  <Text style={styles.oddLabel}>Fora</Text>
                  <Text style={styles.oddValue}>3.80</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sample Match 2 */}
            <View style={styles.quickBetCard}>
              <View style={styles.matchHeader}>
                <Text style={styles.matchTime}>Amanhã, 16:00</Text>
              </View>
              
              <View style={styles.teamsRow}>
                <Text style={styles.teamName}>São Paulo</Text>
                <Text style={styles.vsText}>vs</Text>
                <Text style={styles.teamName}>Corinthians</Text>
              </View>
              
              <View style={styles.oddsRow}>
                <TouchableOpacity style={styles.oddButton}>
                  <Text style={styles.oddLabel}>Casa</Text>
                  <Text style={styles.oddValue}>1.85</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.oddButton}>
                  <Text style={styles.oddLabel}>Empate</Text>
                  <Text style={styles.oddValue}>3.40</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.oddButton}>
                  <Text style={styles.oddLabel}>Fora</Text>
                  <Text style={styles.oddValue}>4.20</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SDUIRenderer
      screenName="home"
      fallbackComponent={FallbackComponent}
      onScreenLoad={(config) => {
        console.log('🏠 Home screen loaded:', config.layout?.type || 'unknown');
      }}
      onError={(error) => {
        console.error('🏠 Home screen error:', error);
      }}
    />
  );
};
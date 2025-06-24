import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/design-system';
import { SDUIRenderer } from '@/components/sdui/SDUIRenderer';
import { Icon } from '@/components/shared/Icon';

const { width } = Dimensions.get('window');
const gameCardWidth = (width - 48) / 2;

export const CasinoScreen: React.FC = () => {
  const { theme } = useTheme();

  const casinoCategories = [
    { id: 'slots', name: 'Slots', icon: 'slot-machine' as const, color: '#9333ea' },
    { id: 'live', name: 'Ao Vivo', icon: 'live' as const, color: '#dc2626' },
    { id: 'table', name: 'Mesa', icon: 'cards' as const, color: '#059669' },
    { id: 'roulette', name: 'Roleta', icon: 'roulette' as const, color: '#ea580c' },
  ];

  const featuredGames = [
    {
      id: '1',
      name: 'Book of Dead',
      provider: 'Play\'n GO',
      image: '🎰',
      category: 'slots',
      rtp: '96.21%',
      jackpot: 'R$ 125.460',
      isNew: true,
    },
    {
      id: '2',
      name: 'Lightning Roulette',
      provider: 'Evolution',
      image: '⚡',
      category: 'live',
      rtp: '97.30%',
      isLive: true,
    },
    {
      id: '3',
      name: 'Blackjack VIP',
      provider: 'NetEnt',
      image: '♠️',
      category: 'table',
      rtp: '99.28%',
    },
    {
      id: '4',
      name: 'Starburst',
      provider: 'NetEnt',
      image: '⭐',
      category: 'slots',
      rtp: '96.09%',
      isPopular: true,
    },
  ];

  const FallbackComponent = () => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background.secondary,
      },
      header: {
        backgroundColor: theme.colors.background.primary,
        paddingHorizontal: 20,
        paddingVertical: 16,
      },
      headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: 8,
      },
      searchContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.background.tertiary,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
      },
      searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: theme.colors.text.primary,
      },
      scrollContent: {
        flex: 1,
      },
      jackpotBanner: {
        margin: 16,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      jackpotGradient: {
        padding: 24,
        alignItems: 'center',
        minHeight: 120,
        justifyContent: 'center',
      },
      jackpotTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 8,
      },
      jackpotAmount: {
        fontSize: 32,
        fontWeight: '900',
        color: '#ffffff',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
      },
      sectionContainer: {
        paddingHorizontal: 16,
        marginBottom: 24,
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: 16,
      },
      categoriesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      categoryCard: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginHorizontal: 4,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      categoryIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
      },
      categoryName: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.text.primary,
      },
      gamesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      gameCard: {
        width: gameCardWidth,
        backgroundColor: theme.colors.background.primary,
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      gameImageContainer: {
        height: 120,
        backgroundColor: theme.colors.background.tertiary,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      },
      gameImage: {
        fontSize: 48,
      },
      gameBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
      },
      badgeText: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: '700',
      },
      gameInfo: {
        padding: 12,
      },
      gameName: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: 4,
      },
      gameProvider: {
        fontSize: 12,
        color: theme.colors.text.tertiary,
        marginBottom: 8,
      },
      gameStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      rtpText: {
        fontSize: 11,
        color: theme.colors.betting.win,
        fontWeight: '600',
      },
      jackpotText: {
        fontSize: 11,
        color: theme.colors.interactive.secondary,
        fontWeight: '700',
      },
      playButton: {
        backgroundColor: theme.colors.interactive.primary,
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 8,
      },
      playButtonText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '700',
      },
    });

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Casino</Text>
          <View style={styles.searchContainer}>
            <Icon name="search" color={theme.colors.text.tertiary} size={20} />
            <Text style={[styles.searchInput, { color: theme.colors.text.tertiary }]}>
              Buscar jogos...
            </Text>
          </View>
        </View>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Jackpot Banner */}
          <View style={styles.jackpotBanner}>
            <LinearGradient
              colors={[...theme.colors.gradients.casino]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.jackpotGradient}
            >
              <Text style={styles.jackpotTitle}>🎰 MEGA JACKPOT 🎰</Text>
              <Text style={styles.jackpotAmount}>R$ 2.847.592</Text>
            </LinearGradient>
          </View>

          {/* Categories */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <View style={styles.categoriesRow}>
              {casinoCategories.map((category) => (
                <TouchableOpacity key={category.id} style={styles.categoryCard}>
                  <View style={[styles.categoryIconContainer, { backgroundColor: category.color }]}>
                    <Icon name={category.icon} size={24} color="#ffffff" />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Featured Games */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Jogos em Destaque</Text>
            <View style={styles.gamesGrid}>
              {featuredGames.map((game) => (
                <TouchableOpacity key={game.id} style={styles.gameCard}>
                  <View style={styles.gameImageContainer}>
                    <Text style={styles.gameImage}>{game.image}</Text>
                    {game.isNew && (
                      <View style={[styles.gameBadge, { backgroundColor: '#10b981' }]}>
                        <Text style={styles.badgeText}>NOVO</Text>
                      </View>
                    )}
                    {game.isLive && (
                      <View style={[styles.gameBadge, { backgroundColor: '#dc2626' }]}>
                        <Text style={styles.badgeText}>LIVE</Text>
                      </View>
                    )}
                    {game.isPopular && (
                      <View style={[styles.gameBadge, { backgroundColor: '#f59e0b' }]}>
                        <Text style={styles.badgeText}>POPULAR</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.gameInfo}>
                    <Text style={styles.gameName}>{game.name}</Text>
                    <Text style={styles.gameProvider}>{game.provider}</Text>
                    
                    <View style={styles.gameStats}>
                      <Text style={styles.rtpText}>RTP {game.rtp}</Text>
                      {game.jackpot && (
                        <Text style={styles.jackpotText}>{game.jackpot}</Text>
                      )}
                    </View>
                    
                    <TouchableOpacity style={styles.playButton}>
                      <Text style={styles.playButtonText}>JOGAR</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SDUIRenderer
      screenName="casino"
      fallbackComponent={FallbackComponent}
      onScreenLoad={(config) => {
        console.log('🎰 Casino screen loaded:', config.layout?.type || 'unknown');
      }}
      onError={(error) => {
        console.error('🎰 Casino screen error:', error);
      }}
    />
  );
};
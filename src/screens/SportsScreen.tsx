import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/design-system';
import { SDUIRenderer } from '@/components/sdui/SDUIRenderer';
import { Icon, LiveIcon } from '@/components/shared/Icon';

export const SportsScreen: React.FC = () => {
  const { theme } = useTheme();

  const sportsCategories = [
    { id: 'football', name: 'Futebol', icon: 'soccer-ball' as const, count: 127 },
    { id: 'basketball', name: 'Basquete', icon: 'basketball' as const, count: 45 },
    { id: 'tennis', name: 'Tênis', icon: 'tennis' as const, count: 32 },
    { id: 'volleyball', name: 'Vôlei', icon: 'sports' as const, count: 18 },
  ];

  const liveMatches = [
    {
      id: '1',
      homeTeam: 'Flamengo',
      awayTeam: 'Palmeiras',
      score: '2-1',
      time: '78\'',
      odds: { home: 1.45, draw: 4.20, away: 6.50 },
      league: 'Brasileirão',
    },
    {
      id: '2',
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      score: '1-1',
      time: '65\'',
      odds: { home: 2.10, draw: 3.20, away: 3.80 },
      league: 'La Liga',
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
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: 8,
      },
      headerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      actionButton: {
        flex: 1,
        marginHorizontal: 4,
        backgroundColor: theme.colors.background.tertiary,
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      actionButtonText: {
        marginLeft: 8,
        fontSize: 13,
        fontWeight: '600',
        color: theme.colors.text.primary,
      },
      scrollContent: {
        flex: 1,
      },
      sectionContainer: {
        padding: 16,
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: 16,
      },
      categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
      },
      categoryCard: {
        width: '48%',
        backgroundColor: theme.colors.background.primary,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      categoryIcon: {
        marginBottom: 8,
      },
      categoryName: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 4,
      },
      categoryCount: {
        fontSize: 12,
        color: theme.colors.text.tertiary,
      },
      liveSection: {
        backgroundColor: theme.colors.background.primary,
        margin: 16,
        borderRadius: 16,
        overflow: 'hidden',
      },
      liveSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
      },
      liveSectionTitle: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
      },
      matchCard: {
        backgroundColor: theme.colors.background.primary,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.subtle,
      },
      matchHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
      },
      league: {
        fontSize: 12,
        color: theme.colors.text.tertiary,
        fontWeight: '600',
      },
      matchTime: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.betting.live,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
      },
      timeText: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: '700',
        marginLeft: 4,
      },
      teamsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      teamInfo: {
        flex: 1,
        alignItems: 'center',
      },
      teamName: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text.primary,
        textAlign: 'center',
      },
      scoreContainer: {
        alignItems: 'center',
        marginHorizontal: 20,
      },
      score: {
        fontSize: 24,
        fontWeight: '800',
        color: theme.colors.interactive.primary,
      },
      oddsContainer: {
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

    const renderCategory = ({ item }: { item: typeof sportsCategories[0] }) => (
      <TouchableOpacity style={styles.categoryCard}>
        <View style={styles.categoryIcon}>
          <Icon name={item.icon} size={32} color={theme.colors.interactive.primary} />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>{item.count} jogos</Text>
      </TouchableOpacity>
    );

    const renderLiveMatch = ({ item }: { item: typeof liveMatches[0] }) => (
      <View style={styles.matchCard}>
        <View style={styles.matchHeader}>
          <Text style={styles.league}>{item.league}</Text>
          <View style={styles.matchTime}>
            <LiveIcon color="#ffffff" size={12} />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
        
        <View style={styles.teamsContainer}>
          <View style={styles.teamInfo}>
            <Text style={styles.teamName}>{item.homeTeam}</Text>
          </View>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{item.score}</Text>
          </View>
          
          <View style={styles.teamInfo}>
            <Text style={styles.teamName}>{item.awayTeam}</Text>
          </View>
        </View>
        
        <View style={styles.oddsContainer}>
          <TouchableOpacity style={styles.oddButton}>
            <Text style={styles.oddLabel}>Casa</Text>
            <Text style={styles.oddValue}>{item.odds.home}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.oddButton}>
            <Text style={styles.oddLabel}>Empate</Text>
            <Text style={styles.oddValue}>{item.odds.draw}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.oddButton}>
            <Text style={styles.oddLabel}>Fora</Text>
            <Text style={styles.oddValue}>{item.odds.away}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Esportes</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <LiveIcon color={theme.colors.betting.live} size={16} />
              <Text style={styles.actionButtonText}>Ao Vivo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="search" color={theme.colors.text.primary} size={16} />
              <Text style={styles.actionButtonText}>Buscar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="filter" color={theme.colors.text.primary} size={16} />
              <Text style={styles.actionButtonText}>Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Sports Categories */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <View style={styles.categoriesGrid}>
              {sportsCategories.map((category) => (
                <TouchableOpacity key={category.id} style={styles.categoryCard}>
                  <View style={styles.categoryIcon}>
                    <Icon name={category.icon} size={32} color={theme.colors.interactive.primary} />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>{category.count} jogos</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Live Matches */}
          <View style={styles.liveSection}>
            <LinearGradient
              colors={[theme.colors.betting.live, '#c53030']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.liveSectionHeader}
            >
              <LiveIcon color="#ffffff" size={20} />
              <Text style={styles.liveSectionTitle}>Jogos Ao Vivo</Text>
            </LinearGradient>
            
            {liveMatches.map((match) => (
              <View key={match.id} style={styles.matchCard}>
                <View style={styles.matchHeader}>
                  <Text style={styles.league}>{match.league}</Text>
                  <View style={styles.matchTime}>
                    <LiveIcon color="#ffffff" size={12} />
                    <Text style={styles.timeText}>{match.time}</Text>
                  </View>
                </View>
                
                <View style={styles.teamsContainer}>
                  <View style={styles.teamInfo}>
                    <Text style={styles.teamName}>{match.homeTeam}</Text>
                  </View>
                  
                  <View style={styles.scoreContainer}>
                    <Text style={styles.score}>{match.score}</Text>
                  </View>
                  
                  <View style={styles.teamInfo}>
                    <Text style={styles.teamName}>{match.awayTeam}</Text>
                  </View>
                </View>
                
                <View style={styles.oddsContainer}>
                  <TouchableOpacity style={styles.oddButton}>
                    <Text style={styles.oddLabel}>Casa</Text>
                    <Text style={styles.oddValue}>{match.odds.home}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.oddButton}>
                    <Text style={styles.oddLabel}>Empate</Text>
                    <Text style={styles.oddValue}>{match.odds.draw}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.oddButton}>
                    <Text style={styles.oddLabel}>Fora</Text>
                    <Text style={styles.oddValue}>{match.odds.away}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SDUIRenderer
      screenName="sports"
      fallbackComponent={FallbackComponent}
      onScreenLoad={(config) => {
        console.log('⚽ Sports screen loaded:', config.layout?.type || 'unknown');
      }}
      onError={(error) => {
        console.error('⚽ Sports screen error:', error);
      }}
    />
  );
};